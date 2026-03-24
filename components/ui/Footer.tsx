import Link from "next/link";

const socials = [
  { label: "GitHub", href: "https://github.com/batsalbhusal" },
  { label: "LinkedIn", href: "https://linkedin.com/in/batsalbhusal" },
  { label: "Website", href: "https://batsalbhusal.com.np" },
  { label: "Email", href: "mailto:batsalbhusal5@gmail.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-color)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs dark:text-zinc-600 text-zinc-400">
          © {year} Batsal Bhusal — Built with Next.js & Tailwind CSS
        </p>
        <nav className="flex items-center gap-6">
          {socials.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest dark:text-zinc-500 text-zinc-500 hover:text-[var(--accent)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
