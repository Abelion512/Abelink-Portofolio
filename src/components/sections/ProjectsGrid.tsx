"use client";

import { motion } from "motion/react";
import { Github, ExternalLink, Code2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useLangStore } from "@/store/languageStore";

export type ProjectStatus = 'live' | 'wip' | 'preview';

export interface Project {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  status: ProjectStatus;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPinned: boolean;
}

interface ProjectsGridProps {
  initialProjects?: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const { t } = useLangStore();
  const displayProjects = initialProjects || [];

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-4">
              {t('projects.subtitle')}
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
              {t('projects.title')}
            </h3>
          </div>
          <p className="max-w-md text-text-secondary font-body">
            {t('projects.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: Project, i: number) => (
            <ProjectCard key={project.id || project.name} project={project} index={i} />
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <Link 
            href="https://github.com/Abelion512" 
            target="_blank"
            className="flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-primary transition-colors group"
          >
            <span>{t('projects.viewAll')}</span>
            <Github size={16} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLangStore();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#0a0a0c] border border-neutral-800/80 rounded-[2.5rem] overflow-hidden hover:border-neutral-600 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.2)]"
    >
      <div className="relative aspect-video bg-neutral-900/50 overflow-hidden border-b border-neutral-800/80">
        <img 
          src={project.coverImage} 
          alt={project.name}
          className="w-full h-full object-cover grayscale-[0.3] transition-transform duration-700 group-hover:scale-[1.05] group-hover:grayscale-0"
        />
        
        {/* Minimal Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <div className="px-5 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            View Project <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Featured Badge */}
        {project.isPinned && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-tighter border border-white/5 bg-black/60 text-neutral-400 backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.map((tag) => (
            <span 
              key={tag} 
              className="px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-neutral-500 bg-neutral-900/30 rounded-sm border border-neutral-800"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-sm font-bold text-neutral-200 mb-1 leading-tight group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        
        <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed font-medium">
          {project.description}
        </p>
      </div>

      {/* Main Link Overlay */}
      <Link 
        href={project.liveUrl || project.githubUrl || '#'} 
        target="_blank"
        className="absolute inset-0 z-20"
        aria-label={project.name}
      />
    </motion.div>
  );
}
