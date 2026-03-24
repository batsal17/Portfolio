"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlogCard } from "@/components/ui/BlogCard";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
}

export function Blog({ posts }: { posts: Post[] }) {
  return (
    <section id="blog" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel index="03" label="Writing" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4 mb-12">
          <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight dark:text-white text-zinc-900">
            Words on{" "}
            <span
              className="font-display"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.25)",
                color: "transparent",
              }}
            >
              systems
            </span>
          </h2>
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest dark:text-zinc-400 text-zinc-500 hover:text-[var(--accent)] transition-colors flex items-center gap-2 shrink-0"
          >
            All posts →
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[var(--border-color)] bg-[var(--border-color)] flex flex-col gap-px"
        >
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} variant="full" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
