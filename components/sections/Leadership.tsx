"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const leadership = [
  {
    id: 1,
    role: "Elected Member",
    org: "Free Students' Union (FSU)",
    place: "Pulchowk Campus, IOE",
    period: "2024 – Present",
    status: "Active",
    icon: "🗳",
    color: "accent",
    points: [
      "Elected by 1,162 votes to lead student welfare and digital transformation initiatives.",
      "Directed the development of the Official FSU Website for the campus community.",
      "Built and managed a Discord Server serving 2,000+ students for academic collaboration.",
    ],
    tags: ["Student Government", "Web Development", "Community"],
  },
  {
    id: 2,
    role: "President — 13th Executive Committee",
    org: "GAP Pulchowk",
    place: "Pulchowk Campus, IOE",
    period: "2024 – 2025",
    status: "Completed",
    icon: "🏛",
    color: "green",
    points: [
      "Managed a multidisciplinary team to execute strategic campus events.",
      "Organized professional development workshops for engineering students.",
      "Led committee planning, coordination, and stakeholder communications.",
    ],
    tags: ["Leadership", "Event Management", "Team Building"],
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="06" label="Leadership" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4 mb-16">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight dark:text-white text-zinc-900">
            Beyond{" "}
            <span
              className="font-display font-black"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                color: "transparent",
              }}
            >
              the
            </span>{" "}
            <span className="text-[var(--accent)]">code</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadership.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border border-[var(--border-color)] dark:bg-[#0d1117] bg-[#f0ece4] p-8 hover:border-[rgba(0,201,122,0.35)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] via-[rgba(0,201,122,0.5)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Background glow */}
              <div
                className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,201,122,0.06), transparent)",
                }}
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-[var(--border-color)] dark:bg-[#111620] bg-[#eae6df] flex items-center justify-center text-2xl shrink-0 group-hover:border-[rgba(0,201,122,0.4)] transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border ${
                        item.status === "Active"
                          ? "border-[rgba(0,201,122,0.3)] bg-[rgba(0,201,122,0.08)] text-[var(--accent)]"
                          : "border-[rgba(161,161,170,0.3)] bg-[rgba(161,161,170,0.08)] dark:text-zinc-400 text-zinc-500"
                      }`}
                    >
                      {item.status === "Active" ? "● " : ""}
                      {item.status}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[11px] dark:text-zinc-500 text-zinc-500 shrink-0 text-right">
                  {item.period}
                </span>
              </div>

              {/* Role & Org */}
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight dark:text-white text-zinc-900 mb-1 leading-snug">
                {item.role}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="font-mono text-sm text-[var(--accent)] font-medium">
                  {item.org}
                </span>
                <span className="font-mono text-xs dark:text-zinc-600 text-zinc-400">
                  · {item.place}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="flex flex-col gap-3 mb-6 flex-1">
                {item.points.map((point, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + j * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3 font-mono text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed"
                  >
                    <span className="text-[var(--accent)] mt-0.5 shrink-0 text-base leading-none">
                      ›
                    </span>
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[var(--border-color)] dark:text-zinc-500 text-zinc-500 dark:bg-[#080a0f] bg-[#f5f4f0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 border border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)] dark:bg-[#0d1117] bg-[#f0ece4]"
        >
          {[
            { num: "1,162", label: "Votes received", icon: "🗳" },
            { num: "2,000+", label: "Students reached", icon: "👥" },
            { num: "2", label: "Leadership roles", icon: "🏆" },
          ].map(({ num, label, icon }) => (
            <div key={label} className="flex items-center gap-4 px-8 py-6">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className="font-display font-black text-2xl tracking-tight dark:text-white text-zinc-900">
                  {num}
                </div>
                <div className="font-mono text-xs dark:text-zinc-500 text-zinc-500 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
