"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const ROLES = [
  "ECE Engineer",
  "AI & ML Developer",
  "RAG Systems Builder",
  "Computer Vision Engineer",
  "Full-Stack Developer",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    if (waiting) {
      const t = setTimeout(() => setWaiting(false), pause);
      return () => clearTimeout(t);
    }

    const current = words[wordIdx];

    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
        if (charIdx === current.length) {
          setWaiting(true);
          setDeleting(true);
        }
      }, speed);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx >= 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }, speed / 2);
      return () => clearTimeout(t);
    }
  }, [charIdx, deleting, waiting, wordIdx, words, speed, pause]);

  return displayed;
}

export function Hero() {
  const typed = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated grid/particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const dots: { x: number; y: number; vx: number; vy: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * 1400,
        y: Math.random() * 700,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.005;

      // Draw grid lines
      ctx.strokeStyle = "rgba(0,201,122,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw connecting lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(0,201,122,${0.06 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move dots
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,201,122,${d.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,201,122,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Status badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 mb-8",
                "border border-[rgba(0,201,122,0.25)] bg-[rgba(0,201,122,0.06)]",
                "px-3 py-1.5 font-mono text-[11px] text-[var(--accent)] tracking-wider uppercase",
                "opacity-0 animate-fade-up"
              )}
              style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              Available for new opportunities
            </div>

            {/* Name */}
            <h1
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
            >
              <span className="font-display font-black text-[clamp(52px,7vw,88px)] leading-[0.88] tracking-tight dark:text-white text-zinc-900 block">
                Batsal
              </span>
              <span
                className="font-display font-black text-[clamp(52px,7vw,88px)] leading-[0.88] tracking-tight block"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  color: "transparent",
                }}
              >
                Bhusal
                <span className="text-[var(--accent)]" style={{ WebkitTextStroke: "0" }}>
                  _
                </span>
              </span>
            </h1>

            {/* Typing role */}
            <div
              className="mt-6 mb-6 h-7 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              {mounted && (
                <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 tracking-wide">
                  <span className="text-[var(--accent)]">~/</span>{" "}
                  {typed}
                  <span className="inline-block w-0.5 h-4 bg-[var(--accent)] ml-0.5 align-middle animate-blink" />
                </p>
              )}
            </div>

            <p
              className="font-mono text-sm dark:text-zinc-400 text-zinc-500 leading-relaxed max-w-md mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
            >
              ECE student at Pulchowk Campus, IOE. I build AI systems,
              RAG pipelines, and computer vision tools. Passionate about
              applying ML to real-world problems in Nepal and beyond.
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[#080a0f] font-mono text-xs font-medium uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,201,122,0.35)] hover:-translate-y-0.5 transition-all duration-200"
              >
                View projects
                <span>↓</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] dark:text-zinc-300 text-zinc-700 font-mono text-xs uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Right — terminal widget */}
          <div
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: "0.55s", animationFillMode: "forwards" }}
          >
            <Terminal />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="font-mono text-[10px] uppercase tracking-widest dark:text-zinc-600 text-zinc-400">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const lines = [
    { prompt: true, cmd: "whoami" },
    { out: "Batsal Bhusal — ECE Engineer & AI Developer" },
    { blank: true },
    { prompt: true, cmd: "cat skills.json" },
    { out: '{' },
    { out: '  "languages": ["Python", "C/C++", "TypeScript"],', highlight: ["Python", "C/C++", "TypeScript"] },
    { out: '  "ai_ml": ["RAG", "YOLO", "spaCy", "TFLite"],', pink: true },
    { out: '  "focus": "AI & computer vision"' },
    { out: '}' },
    { blank: true },
    { prompt: true, cmd: "git log --oneline -2" },
    { out: "a3f1c2e feat: launch SarkariSathi v1.0", pink: true },
    { out: "b9d4a17 feat: deploy HomeCam edge inference", pink: true },
    { prompt: true, cursor: true },
  ];

  return (
    <div className="dark:bg-[#0d1117] bg-[#e8e4dc] border border-[var(--border-color)] shadow-2xl overflow-hidden scan-line">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 dark:bg-[#080a0f] bg-[#ddd9d1] border-b border-[var(--border-color)]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-auto font-mono text-[11px] dark:text-zinc-600 text-zinc-400">
          alex@portfolio ~
        </span>
      </div>
      {/* Body */}
      <div className="p-6 font-mono text-[13px] leading-[2] space-y-0">
        {lines.map((line, i) =>
          line.blank ? (
            <div key={i} className="h-4" />
          ) : line.prompt ? (
            <div key={i} className="flex gap-3">
              <span className="text-[var(--accent)] select-none">›</span>
              {line.cmd && (
                <span className="dark:text-zinc-200 text-zinc-800">{line.cmd}</span>
              )}
              {line.cursor && (
                <span className="inline-block w-2 h-4 bg-[var(--accent)] animate-blink align-middle" />
              )}
            </div>
          ) : (
            <div
              key={i}
              className={cn(
                "pl-6 dark:text-zinc-500 text-zinc-500",
                line.pink && "dark:text-[#ff6b9d] text-[#d9245e]"
              )}
            >
              {line.out}
            </div>
          )
        )}
      </div>
    </div>
  );
}
