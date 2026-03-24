"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#leadership", label: "Leadership" },
  { href: "#certifications", label: "Certs" },
  { href: "#blog", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "dark:bg-[rgba(8,10,15,0.88)] bg-[rgba(245,244,240,0.88)] backdrop-blur-xl border-b border-[var(--border-color)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-black text-lg tracking-tight dark:text-white text-zinc-900 hover:text-[var(--accent)] transition-colors"
          >
            Batsal<span className="text-[var(--accent)]">.</span>Bhusal
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="font-mono text-[11px] uppercase tracking-widest dark:text-zinc-400 text-zinc-500 hover:text-[var(--accent)] transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "block w-5 h-0.5 dark:bg-white bg-zinc-900 transition-transform duration-300 origin-center",
                  menuOpen && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-0.5 dark:bg-white bg-zinc-900 transition-opacity duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-0.5 dark:bg-white bg-zinc-900 transition-transform duration-300 origin-center",
                  menuOpen && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8",
          "dark:bg-[rgba(8,10,15,0.97)] bg-[rgba(245,244,240,0.97)] backdrop-blur-2xl",
          "transition-all duration-300 md:hidden",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {links.map(({ href, label }, i) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={cn(
              "font-display font-black text-4xl tracking-tight dark:text-white text-zinc-900 hover:text-[var(--accent)] transition-colors",
              "translate-y-0 opacity-100",
              menuOpen ? "animate-fade-up" : "opacity-0"
            )}
            style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
}
