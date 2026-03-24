# Alex Chen — Portfolio

A minimal, futuristic developer portfolio built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Fonts | Fraunces (display) + DM Mono (code) |
| Theme | next-themes (dark/light) |
| Contact | API Route + Nodemailer (SMTP) |
| Hosting | Vercel (recommended) |

## Features

- **Animated hero** with canvas particle background and typewriter role cycling
- **Dark / light mode** toggle, saved to localStorage via next-themes
- **Projects** loaded from `data/projects.json` (swap for an API endpoint easily)
- **Blog** listing from `data/posts.json` with a full `/blog` page
- **Contact form** with server-side validation, rate limiting, and SMTP email delivery
- **SEO** meta tags, Open Graph, and Twitter card support
- **Performance** — lazy loaded images, font optimization via `next/font`, CSS transitions instead of JS where possible

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuring the Contact Form

### Option A — SMTP (Recommended)

The easiest way is [Resend](https://resend.com) — free tier gives 3,000 emails/month.

1. Sign up at resend.com and get your API key
2. In `.env.local`:
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=re_your_api_key_here
CONTACT_EMAIL=your@email.com
```

### Option B — EmailJS (No backend needed)

1. Create an account at emailjs.com
2. Set up a service, template, and get your public key
3. In `app/api/contact/route.ts`, call the EmailJS REST API:

```ts
await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: { name, email, subject, message },
  }),
});
```

## Customizing Content

| What | Where |
|---|---|
| Projects | `data/projects.json` |
| Blog posts | `data/posts.json` |
| Personal info / stats | `components/sections/About.tsx` |
| Typing roles | `components/sections/Hero.tsx` → `ROLES` array |
| Social links | `components/ui/Footer.tsx` and `components/sections/Contact.tsx` |
| SEO metadata | `app/layout.tsx` → `metadata` export |
| Colors / fonts | `tailwind.config.ts` + `app/globals.css` |

## Deploying to Vercel

```bash
npm i -g vercel
vercel
```

Set your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

## Adding Real Blog Posts

Blog posts are currently static JSON. To support MDX content:

1. Install: `npm install @next/mdx @mdx-js/loader @mdx-js/react`
2. Create `content/posts/[slug].mdx` files
3. Update `app/blog/[slug]/page.tsx` to read MDX via `next-mdx-remote` or the built-in `@next/mdx` plugin

## License

MIT
