"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const education = [
  {
    id: 1,
    degree: "B.E. in Electronics, Communication and Information Engineering",
    institution: "Pulchowk Campus, IOE",
    location: "Lalitpur, Nepal",
    period: "2022 – 2026",
    status: "In Progress",
    statusColor: "accent",
    description:
      "Studying core ECE subjects alongside AI, machine learning, and software engineering. Active in student leadership and multiple technical projects.",
    highlights: [
      "AI & Machine Learning",
      "Signal Processing",
      "Embedded Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    icon: "🎓",
  },
  {
    id: 2,
    degree: "+2 Science",
    institution: "SOS Hermann Gmeiner School",
    location: "Bhaktapur, Nepal",
    period: "2020 – 2021",
    status: "GPA 3.68 / 4.0",
    statusColor: "green",
    description:
      "Completed higher secondary education with a focus on Physics, Chemistry, Mathematics and Computer Science.",
    highlights: ["Physics", "Mathematics", "Chemistry", "Computer Science"],
    icon: "📚",
  },
  {
    id: 3,
    degree: "SEE (Secondary Education Examination)",
    institution: "Occidental Public School",
    location: "Kathmandu, Nepal",
    period: "2018",
    status: "GPA 3.75 / 4.0",
    statusColor: "green",
    description:
      "Completed secondary education with strong academic performance across all core subjects.",
    highlights: ["Mathematics", "Science", "English", "Social Studies"],
    icon: "🏫",
  },
];

const certifications = [
  {
    title: "Python Certification",
    issuer: "Samsung Innovation Campus",
    year: "2023",
    icon: "🐍",
  },
];

export function Education() {
  return (
    <section id="education" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="05" label="Education" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4 mb-16">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight dark:text-white text-zinc-900">
            Academic{" "}
            <span className="text-[var(--accent)]">background</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden md:block absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--border-color)] to-transparent" />

          <div className="flex flex-col gap-8 md:gap-0">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 md:mb-12 ${
                    isLeft ? "" : "md:direction-rtl"
                  }`}
                >
                  {/* Timeline dot — desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] z-10 items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  </div>

                  {/* Left side content */}
                  {isLeft ? (
                    <>
                      <EducationCard edu={edu} align="right" />
                      <div className="hidden md:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" />
                      <EducationCard edu={edu} align="left" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  align,
}: {
  edu: (typeof education)[0];
  align: "left" | "right";
}) {
  return (
    <div
      className={`group relative border border-[var(--border-color)] dark:bg-[#0d1117] bg-[#f0ece4] p-6 md:p-8 hover:border-[rgba(0,201,122,0.35)] transition-all duration-300 overflow-hidden ${
        align === "right" ? "md:mr-8" : "md:ml-8"
      }`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(0,201,122,0.04) 0%, transparent 60%)" }} />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{edu.icon}</span>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border ${
              edu.statusColor === "accent"
                ? "border-[rgba(0,201,122,0.3)] bg-[rgba(0,201,122,0.08)] text-[var(--accent)]"
                : "border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.08)] text-green-500"
            }`}
          >
            {edu.status}
          </span>
        </div>
        <span className="font-mono text-[11px] dark:text-zinc-500 text-zinc-500 shrink-0">
          {edu.period}
        </span>
      </div>

      {/* Degree */}
      <h3 className="font-display font-bold text-lg md:text-xl tracking-tight dark:text-white text-zinc-900 mb-1 leading-snug">
        {edu.degree}
      </h3>

      {/* Institution */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-sm text-[var(--accent)] font-medium">
          {edu.institution}
        </span>
        <span className="font-mono text-xs dark:text-zinc-600 text-zinc-400">
          · {edu.location}
        </span>
      </div>

      {/* Description */}
      <p className="font-mono text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mb-5">
        {edu.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2">
        {edu.highlights.map((h) => (
          <span
            key={h}
            className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-[var(--border-color)] dark:text-zinc-500 text-zinc-500 dark:bg-[#080a0f] bg-[#f5f4f0]"
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
