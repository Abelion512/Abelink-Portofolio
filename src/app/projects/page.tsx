"use client";

import { useEffect, useState } from "react";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { supabase } from "@/lib/supabase";
import { Project, ProjectStatus } from "@/components/sections/ProjectsGrid";
import { useLangStore } from "@/store/languageStore";

async function getGithubProjects(): Promise<Project[]> {
  try {
    const res = await fetch("https://api.github.com/users/Abelion512/repos?sort=updated&per_page=12");
    if (!res.ok) return [];
    const repos = await res.json();
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLangStore();

  useEffect(() => {
    async function init() {
      const [dbRes, githubProjects] = await Promise.all([
        supabase.from('projects').select('*').eq('is_visible', true).order('sort_order', { ascending: true }),
        getGithubProjects()
      ]);

      const dbProjects: Project[] = (dbRes.data || []).map(p => ({
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

      const dbNames = new Set(dbProjects.map(p => p.name.toLowerCase()));
      const filteredGithub = githubProjects.filter(p => !dbNames.has(p.name.toLowerCase()));
      
      setProjects([...dbProjects, ...filteredGithub]);
      setLoading(false);
    }
    init();
  }, []);

  return (
    <main className="min-h-screen pt-32 px-6 max-w-7xl mx-auto mb-20">
      <div className="mb-16">
        <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text-primary mb-6">
          {t('projects.title').split(' ')[0]} <br />
          <span className="text-gradient">{t('projects.title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="max-w-2xl text-text-secondary text-lg font-body leading-relaxed">
          {t('projects.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-[16/10] bg-surface/30 rounded-[2.5rem] border border-border/50" />
          ))}
        </div>
      ) : (
        <ProjectsGrid initialProjects={projects} />
      )}
    </main>
  );
}
