import { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Projects | Abelink Portfolio",
  description: "Explore the projects built by Abelink and the OlivX team.",
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
    return repos.map((repo: any) => ({
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
  const filteredGithub = githubProjects.filter((p: any) => !manualNames.has(p.name.toLowerCase()));
  
  const allProjects = [...manualProjects, ...filteredGithub];

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-display font-bold italic mb-2">Curated <span className="text-gradient">Projects</span></h1>
          <p className="text-text-secondary text-lg">A selection of tools and systems built by OlivX.</p>
        </div>
        <div className="flex gap-2">
          {["All", "Live", "WIP", "GitHub"].map(filter => (
            <button key={filter} className="px-4 py-1.5 rounded-full border border-border text-sm hover:bg-surface transition-colors focus:bg-surface focus:text-primary">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project, idx) => (
          <a key={idx} href={project.html_url} target="_blank" rel="noopener noreferrer" className="block group rounded-3xl glass border border-border bg-surface/30 hover:border-olivx-purple/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] flex flex-col overflow-hidden">
            {/* Cover Image Placeholder */}
            <div className="relative w-full aspect-video bg-gradient-to-br from-surface to-base flex items-center justify-center border-b border-border/50">
              <span className="text-2xl font-display font-bold text-text-secondary/40 px-4 text-center line-clamp-1 group-hover:scale-105 transition-transform duration-500">{project.name}</span>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-base/80 backdrop-blur-md border border-border text-[10px] font-mono text-ai-teal tracking-tighter uppercase z-10">
                {project.status}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold group-hover:text-gradient transition-all">{project.name}</h3>
                <div className="text-text-secondary group-hover:text-olivx-purple transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300">
                  ↗
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed line-clamp-2">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech?.map((t: string) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-surface/50 border border-border/50 text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
