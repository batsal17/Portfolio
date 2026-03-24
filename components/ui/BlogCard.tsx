"use client";

import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured: boolean;
}

interface BlogCardProps {
  post: Post;
  index: number;
  variant?: "compact" | "full";
}

export function BlogCard({ post, index, variant = "compact" }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block dark:bg-[#080a0f] bg-[#f5f4f0]",
        "p-6 md:p-8",
        "border-b border-[var(--border-color)] last:border-b-0",
        "hover:dark:bg-[#111620] hover:bg-[#eae6df]",
        "transition-colors duration-200 relative overflow-hidden"
      )}
    >
      {/* Hover accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[10px] text-[var(--accent)] tracking-widest">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] dark:text-zinc-600 text-zinc-400">
              {formatDate(post.date)}
            </span>
            <span className="font-mono text-[10px] dark:text-zinc-600 text-zinc-400">
              · {post.readingTime} read
            </span>
          </div>
          <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight dark:text-white text-zinc-900 group-hover:text-[var(--accent)] transition-colors mb-2">
            {post.title}
          </h3>
          {variant === "full" && (
            <p className="font-mono text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:flex-col md:items-end md:gap-1.5 shrink-0">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border border-[var(--border-color)] dark:text-zinc-500 text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Read article</span>
        <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
      </div>
    </Link>
  );
}
