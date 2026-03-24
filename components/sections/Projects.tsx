"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  year: number;
  stats: { stars: number; forks: number };
}

interface ProjectsProps {
  projects: Project[];
  allProjects: Project[];
}

export function Projects({ projects, allProjects }: ProjectsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? allProjects : projects;

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="02" label="Selected Projects" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4 mb-12">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight dark:text-white text-zinc-900">
            Things I&apos;ve{" "}
            <span className="text-[var(--accent)]">built</span>
          </h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="font-mono text-xs uppercase tracking-widest dark:text-zinc-400 text-zinc-500 hover:text-[var(--accent)] transition-colors flex items-center gap-2 shrink-0"
          >
            {showAll ? "Show less" : `View all (${allProjects.length})`}
            <span className={cn("transition-transform", showAll && "rotate-180")}>↓</span>
          </button>
        </div>

        <div className="border border-[var(--border-color)] grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-color)]">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative dark:bg-[#080a0f] bg-[#f5f4f0] p-8 md:p-10 flex flex-col overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,201,122,0.04) 0%, transparent 60%)",
        }}
      />
      <motion.div
        animate={{ background: hovered ? "var(--surface)" : "transparent" }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-[11px] text-[var(--accent)] tracking-widest uppercase">
            {String(index + 1).padStart(2, "0")} / Project
          </span>
          <div className="flex items-center gap-3 font-mono text-[11px] dark:text-zinc-600 text-zinc-400">
            <span>★ {project.stats.stars.toLocaleString()}</span>
            <span>{project.year}</span>
          </div>
        </div>

        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight dark:text-white text-zinc-900 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <motion.span
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? 0 : -8,
              y: hovered ? 0 : 8,
            }}
            transition={{ duration: 0.2 }}
            className="text-xl text-[var(--accent)] mt-1 ml-2 shrink-0"
          >
            ↗
          </motion.span>
        </div>

        <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed flex-1 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[rgba(0,201,122,0.2)] bg-[rgba(0,201,122,0.05)] text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-wider dark:text-zinc-500 text-zinc-500 hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <span>GitHub</span>
            <span>↗</span>
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider dark:text-zinc-500 text-zinc-500 hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live demo</span>
              <span>↗</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
