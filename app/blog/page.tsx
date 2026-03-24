import type { Metadata } from "next";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import posts from "@/data/posts.json";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on AI, RAG systems, computer vision, and building software in Nepal.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen dark:bg-[#080a0f] bg-[#f5f4f0]">
      <Navbar />
      <section className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <SectionLabel index="00" label="Writing" />
        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight mb-6 dark:text-white text-zinc-900 mt-4">
          Blog
        </h1>
        <p className="dark:text-zinc-400 text-zinc-600 text-lg mb-16 max-w-xl font-mono">
          Thoughts on AI systems, RAG pipelines, computer vision, and building
          useful software for real-world problems.
        </p>
        <div className="flex flex-col gap-px border border-[var(--border-color)] bg-[var(--border-color)]">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} variant="full" />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
