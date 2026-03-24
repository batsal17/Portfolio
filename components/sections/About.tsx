"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const stats = [
  { num: "3+", label: "Years of coding" },
  { num: "3+", label: "Projects built" },
  { num: "1K+", label: "Votes elected by" },
  { num: "3.68", label: "GPA (+2 Science)" },
];

const cardInfo = [
  { key: "Location", val: "Kathmandu, Nepal" },
  { key: "Education", val: "B.E. ECE, Pulchowk Campus" },
  { key: "Graduation", val: "2026 (Expected)" },
  { key: "Languages", val: "Python · C/C++ · TypeScript" },
  { key: "Interests", val: "AI · Vision · Full-Stack" },
  { key: "Status", val: "● Open to opportunities", green: true },
];

const skills = [
  {
    icon: "🤖",
    title: "AI & ML",
    items: ["RAG / LLMs", "YOLO", "TensorFlow Lite", "spaCy", "Scikit-learn"],
  },
  {
    icon: "⌨",
    title: "Languages",
    items: ["Python", "C/C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    icon: "🌐",
    title: "Web & Tools",
    items: ["Node.js", "HTML/CSS", "MySQL", "Vector DBs", "Git / Linux"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 px-6">
      {/* Stats strip */}
      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="max-w-6xl mx-auto border border-[var(--border-color)] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--border-color)] mb-24"
      >
        {stats.map(({ num, label }) => (
          <motion.div
            key={label}
            variants={item}
            className="group px-8 py-10 relative overflow-hidden dark:bg-[#080a0f] bg-[#f5f4f0]"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            <div className="font-display font-black text-5xl tracking-tight dark:text-white text-zinc-900 mb-1">
              {num.replace(/[+×%]/, "")}
              <span className="text-[var(--accent)]">
                {num.match(/[+×%]/)?.[0]}
              </span>
            </div>
            <div className="font-mono text-xs dark:text-zinc-500 text-zinc-500 uppercase tracking-wider">
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* About body */}
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="01" label="About" />

        <div className="grid md:grid-cols-[1.25fr_1fr] gap-16 items-start mt-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-[2] mb-5">
              <span className="dark:text-white text-zinc-900 font-medium">
                I&apos;m a final-year ECE student at Pulchowk Campus, IOE
              </span>{" "}
              in Kathmandu, Nepal, passionate about building AI systems that
              solve real problems. My focus spans RAG pipelines, computer
              vision, and full-stack development.
            </p>
            <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-[2] mb-5">
              I built SarkariSathi to help Nepali citizens navigate government
              services using bilingual AI, ResuMatch to automate HR screening
              with NLP, and HomeCam to bring edge computer vision to
              resource-constrained devices.
            </p>
            <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-[2] mb-8">
              Beyond code, I was elected to the Free Students&apos; Union at
              Pulchowk by 1,162 votes and led the 13th Executive Committee of
              GAP Pulchowk. When I&apos;m not building, I&apos;m trekking or
              buried in a good book.
            </p>

            {/* Skill cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {skills.map((s) => (
                <div
                  key={s.title}
                  className="border border-[var(--border-color)] dark:bg-[#111620] bg-[#eae6df] p-5 hover:border-[rgba(0,201,122,0.3)] transition-colors"
                >
                  <span className="text-2xl block mb-3">{s.icon}</span>
                  <div className="font-display font-bold text-sm dark:text-white text-zinc-900 mb-3">
                    {s.title}
                  </div>
                  <ul className="space-y-1">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-xs dark:text-zinc-500 text-zinc-500 flex items-center gap-2"
                      >
                        <span className="text-[var(--accent)]">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="border border-[var(--border-color)] dark:bg-[#111620] bg-[#eae6df] p-8 relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,201,122,0.07), transparent)" }} />
            {cardInfo.map(({ key, val, green }) => (
              <div
                key={key}
                className="flex justify-between items-center py-4 border-b border-[var(--border-color)] last:border-b-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider dark:text-zinc-500 text-zinc-500">
                  {key}
                </span>
                <span
                  className={`font-mono text-sm ${green ? "text-[var(--accent)]" : "dark:text-zinc-200 text-zinc-800"}`}
                >
                  {val}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
