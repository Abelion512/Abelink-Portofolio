"use client";

import { motion } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
    <section className="py-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project: Project, i: number) => (
          <ProjectCard key={project.id || project.name} project={project} index={i} />
        ))}
      </div>
      
      <div className="mt-20 flex justify-center">
        <Link 
          href="https://github.com/Abelion512" 
          target="_blank" 
          className="group relative px-8 py-4 bg-surface/30 border border-border/50 rounded-2xl hover:border-primary/40 transition-all duration-300"
        >
          <div className="flex items-center gap-3 text-sm font-mono text-text-secondary group-hover:text-text-primary transition-colors">
            <span>{t('projects.viewAll')}</span>
            <Github size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
        </Link>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-surface/20 border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_50px_-15px_rgba(var(--color-primary-rgb),0.2)]"
    >
      <div className="relative aspect-[16/10] bg-surface/40 overflow-hidden border-b border-border/20">
        <Image 
          src={project.coverImage} 
          alt={project.name}
          width={800}
          height={500}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.08] group-hover:rotate-1"
        />
        
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-60" />
        
        {/* Hover Action */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <div className="px-6 py-3 bg-text-primary text-base text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-2xl flex items-center gap-2">
            Explore Project <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Featured Badge */}
        {project.isPinned && (
          <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
            Featured
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-text-muted bg-surface/40 rounded-full border border-border/40"
            >
              {tag}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-text-muted bg-surface/40 rounded-full border border-border/40">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-display font-bold text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors tracking-tight">
          {project.name}
        </h3>
        
        <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed font-body">
          {project.description}
        </p>
      </div>

      {/* Navigation Link */}
      <Link 
        href={project.liveUrl || project.githubUrl || '#'} 
        target="_blank"
        className="absolute inset-0 z-20"
        aria-label={project.name}
      />
    </motion.div>
  );
}
