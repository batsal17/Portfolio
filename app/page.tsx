import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Leadership } from "@/components/sections/Leadership";
import { Certifications } from "@/components/sections/Certifications";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import projects from "@/data/projects.json";
import posts from "@/data/posts.json";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <main className="relative min-h-screen dark:bg-[#080a0f] bg-[#f5f4f0]">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Projects projects={featuredProjects} allProjects={projects} />
      <Leadership />
      <Certifications />
      <Blog posts={featuredPosts} />
      <Contact />
      <Footer />
    </main>
  );
}
