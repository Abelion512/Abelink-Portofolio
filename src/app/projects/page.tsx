import { Metadata } from "next";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { supabase } from "@/lib/supabase";
import { Project, ProjectStatus } from "@/components/sections/ProjectsGrid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects | Ihsanuddin Salav",
  description: "A curated selection of projects built by Ihsanuddin Salav (Abelion). From AI experiments to production web apps.",
};

async function getSupabaseProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });
    
  if (error || !data) {
    console.error("Supabase error projects:", error);
    return [];
  }
  
  return data.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description || "",
    coverImage: p.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
    status: (p.status || 'live') as ProjectStatus,
    tech: p.tech || [],
    githubUrl: p.github_url || undefined,
    liveUrl: p.live_url || undefined,
    isPinned: p.is_pinned || false
  }));
}

interface GithubRepo {
  id: number;
  name: string;
  fork: boolean;
  description: string | null;
  language: string | null;
  html_url: string;
}

async function getGithubProjects(): Promise<Project[]> {
  try {
    const res = await fetch("https://api.github.com/users/Abelion512/repos?sort=updated&per_page=12", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const repos = await res.json() as GithubRepo[];
    if (!Array.isArray(repos)) return [];
    
    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: `gh-${repo.id}`,
        name: repo.name,
        status: "live" as ProjectStatus,
        description: repo.description || "Open source project on GitHub.",
        tech: repo.language ? [repo.language] : ["Source"],
        githubUrl: repo.html_url,
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        isPinned: false
      }));
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const [dbProjects, githubProjects] = await Promise.all([
    getSupabaseProjects(),
    getGithubProjects()
  ]);
  
  const dbNames = new Set(dbProjects.map(p => p.name.toLowerCase()));
  const filteredGithub = githubProjects.filter(p => !dbNames.has(p.name.toLowerCase()));
  
  const allProjects = [...dbProjects, ...filteredGithub];

  return (
    <main className="min-h-screen pt-32 px-6 max-w-7xl mx-auto mb-20">
      <ProjectsGrid initialProjects={allProjects} />
    </main>
  );
}
