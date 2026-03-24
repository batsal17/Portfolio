import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rate limiting store (in-memory, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const limit = 3;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

function validatePayload(body: unknown): body is ContactPayload {
  if (typeof body !== "object" || !body) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    typeof b.email === "string" &&
    typeof b.subject === "string" &&
    typeof b.message === "string" &&
    b.name.length > 0 &&
    b.email.includes("@") &&
    b.message.length > 0
  );
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (!validatePayload(body)) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body;

    // Option 1: Send via nodemailer (configure SMTP env vars)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; background: #0d1117; color: #e8eaf0; padding: 32px; border-radius: 4px;">
            <div style="color: #00c97a; font-size: 12px; letter-spacing: 0.1em; margin-bottom: 24px;">NEW CONTACT FORM SUBMISSION</div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="color: #5a6380; padding: 8px 0; font-size: 12px; border-bottom: 1px solid #1e2535;">FROM</td><td style="padding: 8px 0; border-bottom: 1px solid #1e2535;">${name}</td></tr>
              <tr><td style="color: #5a6380; padding: 8px 0; font-size: 12px; border-bottom: 1px solid #1e2535;">EMAIL</td><td style="padding: 8px 0; border-bottom: 1px solid #1e2535;">${email}</td></tr>
              <tr><td style="color: #5a6380; padding: 8px 0; font-size: 12px; border-bottom: 1px solid #1e2535;">SUBJECT</td><td style="padding: 8px 0; border-bottom: 1px solid #1e2535;">${subject}</td></tr>
            </table>
            <div style="color: #5a6380; font-size: 12px; margin-bottom: 8px;">MESSAGE</div>
            <div style="color: #e8eaf0; white-space: pre-wrap; line-height: 1.7;">${message}</div>
          </div>
        `,
      });
    } else {
      // Option 2: Log to console (dev fallback) or integrate with EmailJS / Resend
      console.log("[Contact Form Submission]", { name, email, subject, message });
      // For EmailJS: set EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY
      // and call the EmailJS REST API here.
    }

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
