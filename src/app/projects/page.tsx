import { Metadata } from "next";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Projects | Abelion — Student. Builder. Learner.",
  description: "A curated selection of projects built by Ihsanuddin Salav (Abelion).",
};

const manualProjects = [
  { name: "Abelink Portfolio", status: "Live", desc: "Founder-grade portfolio with AI integration.", tech: ["Next.js", "Tailwind v4", "Motion v12"], html_url: "https://github.com/abelion512/Abelink-Portofolio" },
  { name: "LUMINA Preview", status: "WIP", desc: "Next-gen lighting and ambiance control via AI.", tech: ["TypeScript", "n8n", "Docker"], html_url: "#" },
  { name: "learnink AI", status: "WIP", desc: "Personalized learning paths for technical mastery.", tech: ["Next.js", "Anthropic SDK"], html_url: "#" },
  { name: "ab-pay", status: "WIP", desc: "Autonomous finance agent for decentralized payments.", tech: ["Supabase", "TypeScript"], html_url: "#" },
  { name: "Abelion Notes", status: "WIP", desc: "AI-powered knowledge management system.", tech: ["Next.js", "PostgreSQL"], html_url: "#" },
  { name: "Abelion Finance", status: "WIP", desc: "Automation for crypto and stock analysis.", tech: ["n8n", "AI Agents"], html_url: "#" },
];

async function getGithubProjects() {
  try {
    const res = await fetch("https://api.github.com/users/abelion512/repos?sort=updated&per_page=6", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.map((repo: { name: string; description: string; language: string; html_url: string }) => ({
      name: repo.name,
      status: "GitHub",
      desc: repo.description || "No description provided.",
      tech: repo.language ? [repo.language] : ["Code"],
      html_url: repo.html_url
    }));
  } catch (error) {
    console.error("Failed to fetch Github repos:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const githubProjects = await getGithubProjects();
  
  // Merge manual projects with github projects, avoiding duplicates by name
  const manualNames = new Set(manualProjects.map(p => p.name.toLowerCase()));
  const filteredGithub = githubProjects.filter((p: { name: string }) => !manualNames.has(p.name.toLowerCase()));
  
  const allProjects = [...manualProjects, ...filteredGithub];

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24">
      <ProjectsGrid initialProjects={allProjects} />
    </main>
  );
}
