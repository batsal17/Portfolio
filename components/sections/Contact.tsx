"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const socials = [
  {
    icon: "✉",
    label: "Email",
    value: "batsalbhusal5@gmail.com",
    href: "mailto:batsalbhusal5@gmail.com",
  },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/batsalbhusal",
    href: "https://github.com/batsalbhusal",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/batsalbhusal",
    href: "https://linkedin.com/in/batsalbhusal",
  },
  {
    icon: "↓",
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
  },
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="04" label="Contact" />

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-start mt-8">
          {/* Left — heading + socials */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight leading-[0.9] dark:text-white text-zinc-900 mb-8">
              Let&apos;s build
              <br />
              <span className="text-[var(--accent)] glow">something</span>
              <br />
              great.
            </h2>
            <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed mb-10 max-w-sm">
              Have a role, a project idea, or just want to talk systems design?
              I&apos;d love to hear from you. I typically reply within 24 hours.
            </p>

            <div className="flex flex-col gap-3">
              {socials.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 border border-[var(--border-color)] dark:bg-[#111620] bg-[#eae6df] px-6 py-5 hover:border-[var(--accent)] hover:translate-x-1.5 hover:shadow-[-3px_0_0_var(--accent)] transition-all duration-200"
                >
                  <span className="text-lg w-6 text-center dark:text-zinc-400 text-zinc-500 shrink-0">
                    {icon}
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest dark:text-zinc-500 text-zinc-500 mb-0.5">
                      {label}
                    </div>
                    <div className="font-mono text-sm dark:text-zinc-200 text-zinc-800">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "success" ? (
              <div className="border border-[rgba(0,201,122,0.3)] bg-[rgba(0,201,122,0.06)] p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display font-bold text-xl dark:text-white text-zinc-900 mb-2">
                  Message sent!
                </h3>
                <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 mb-6">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Field
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-widest dark:text-zinc-500 text-zinc-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about the project or role..."
                    className={cn(
                      "w-full font-mono text-sm px-4 py-3 resize-none",
                      "border border-[var(--border-color)]",
                      "dark:bg-[#111620] bg-[#eae6df]",
                      "dark:text-zinc-200 text-zinc-800",
                      "placeholder:dark:text-zinc-600 placeholder:text-zinc-400",
                      "focus:outline-none focus:border-[var(--accent)]",
                      "transition-colors"
                    )}
                  />
                </div>

                {status === "error" && (
                  <p className="font-mono text-xs text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "w-full py-4 font-mono text-xs uppercase tracking-widest",
                    "bg-[var(--accent)] text-[#080a0f] font-medium",
                    "hover:shadow-[0_0_30px_rgba(0,201,122,0.3)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-all duration-200"
                  )}
                >
                  {status === "loading" ? "Sending..." : "Send message →"}
                </button>

                <p className="font-mono text-[11px] dark:text-zinc-600 text-zinc-400 text-center">
                  Or email me directly at{" "}
                  <a
                    href="mailto:batsalbhusal5@gmail.com"
                    className="text-[var(--accent)] hover:underline"
                  >
                    batsalbhusal5@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-widest dark:text-zinc-500 text-zinc-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full font-mono text-sm px-4 py-3",
          "border border-[var(--border-color)]",
          "dark:bg-[#111620] bg-[#eae6df]",
          "dark:text-zinc-200 text-zinc-800",
          "placeholder:dark:text-zinc-600 placeholder:text-zinc-400",
          "focus:outline-none focus:border-[var(--accent)]",
          "transition-colors"
        )}
      />
    </div>
  );
}
