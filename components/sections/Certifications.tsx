"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const certifications = [
  {
    id: 1,
    title: "Python Certification",
    issuer: "Samsung Innovation Campus",
    year: "2023",
    icon: "🐍",
    description:
      "Completed Samsung's structured Python programming curriculum covering core programming concepts, data structures, algorithms, and practical application development.",
    skills: ["Python", "Data Structures", "Algorithms", "OOP"],
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="07" label="Certifications" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4 mb-16">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight dark:text-white text-zinc-900">
            Credentials &{" "}
            <span className="text-[var(--accent)]">learning</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative border border-[var(--border-color)] dark:bg-[#0d1117] bg-[#f0ece4] p-7 hover:border-[rgba(0,201,122,0.4)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(0,201,122,0.08), transparent)" }}
              />
              <div className="flex items-start justify-between mb-5">
                <div className="text-4xl">{cert.icon}</div>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-[rgba(0,201,122,0.3)] bg-[rgba(0,201,122,0.08)] text-[var(--accent)]">
                  ✓ Verified
                </span>
              </div>
              <h3 className="font-display font-bold text-xl tracking-tight dark:text-white text-zinc-900 mb-1">
                {cert.title}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-sm text-[var(--accent)]">{cert.issuer}</span>
                <span className="font-mono text-xs dark:text-zinc-600 text-zinc-400">· {cert.year}</span>
              </div>
              <p className="font-mono text-xs dark:text-zinc-400 text-zinc-600 leading-relaxed mb-5 flex-1">
                {cert.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-color)]">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-[rgba(0,201,122,0.2)] bg-[rgba(0,201,122,0.05)] text-[var(--accent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border border-dashed border-[var(--border-color)] p-7 flex flex-col items-center justify-center gap-3 opacity-50 min-h-[220px]"
          >
            <div className="text-3xl">＋</div>
            <div className="font-mono text-xs dark:text-zinc-500 text-zinc-500 text-center leading-relaxed">
              More certifications<br />coming soon
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}