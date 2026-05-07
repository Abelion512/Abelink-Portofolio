"use client";

import { useState } from "react";

interface Project {
  name: string;
  status: string;
  desc: string;
  tech: string[];
  html_url: string;
}

interface ProjectsClientProps {
  initialProjects: Project[];
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? initialProjects 
    : initialProjects.filter(p => p.status === filter);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-display font-bold italic mb-2">Curated <span className="text-gradient">Projects</span></h1>
          <p className="text-text-secondary text-lg">A curated selection of things I've built.</p>
        </div>
        <div className="flex gap-2">
          {["All", "Live", "WIP", "GitHub"].map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full border border-border text-sm transition-all ${
                filter === f ? "bg-surface text-primary border-primary/30" : "text-text-secondary hover:bg-surface"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <a 
            key={idx} 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group rounded-3xl glass border border-border bg-surface/30 hover:border-olivx-purple/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] flex flex-col overflow-hidden"
          >
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
    </>
  );
}
