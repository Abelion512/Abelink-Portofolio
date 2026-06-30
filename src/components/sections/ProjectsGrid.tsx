"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Github, ArrowUpRight, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLangStore } from "@/store/languageStore";
import { site } from "@/config/site";
import SpotlightCard from "../ui/SpotlightCard";

export type ProjectStatus = 'live' | 'wip' | 'preview';

export interface Project {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  status?: ProjectStatus;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPinned?: boolean;
  dominantColor?: string;
}

interface ProjectsGridProps {
  initialProjects?: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const { t } = useLangStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const displayProjects = initialProjects || [];

  return (
    <section className="py-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayProjects.map((project: Project, i: number) => (
          <ProjectCard key={project.id || project.name} project={project} index={i} />
        ))}
      </div>
      
      <div className="mt-24 flex justify-center">
        <Link 
          href={site.social.github} 
          target="_blank" 
          className="group relative px-10 py-4 bg-white/5 border border-white/10 rounded-full hover:border-primary/40 transition-all duration-500 overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-text-secondary group-hover:text-text-primary transition-colors">
            <span>{t('projects.viewAll')}</span>
            <Github size={16} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const projectSlug = project.slug || project.name.toLowerCase().replace(/\s+/g, '-');
  const accentColor = project.dominantColor || "#6C63FF";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <SpotlightCard 
        color={accentColor}
        className="h-full flex flex-col group/card"
      >
        <div className="relative aspect-[16/10] bg-black/40 overflow-hidden border-b border-white/5">
          {(project.coverImage && project.coverImage !== "/placeholder-project.jpg") ? (
            <Image 
              src={project.coverImage} 
              alt={project.name}
              fill
              className="object-cover transition-all duration-1000 group-hover/card:scale-110 group-hover/card:blur-[2px] opacity-80 group-hover/card:opacity-60"
            />
          ) : (
            <div 
              className="absolute inset-0 bg-linear-to-br from-surface to-base flex flex-col items-center justify-center overflow-hidden"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${accentColor}1A 0%, rgba(0,0,0,0.6) 100%)` 
              }}
            >
              <Briefcase size={40} className="text-primary opacity-20 group-hover/card:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-5" />
            </div>
          )}
          
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          {/* Elegant Hover Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-30">
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-50 group-hover/card:scale-100 transition-transform duration-500">
              <ArrowUpRight size={24} />
            </div>
          </div>

          {/* Featured Badge */}
          {project.isPinned && (
            <div className="absolute top-6 left-6 z-10">
              <span 
                className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] backdrop-blur-md border"
                style={{ 
                  color: accentColor, 
                  borderColor: `${accentColor}4D`,
                  backgroundColor: `${accentColor}1A`
                }}
              >
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-8 flex-1 flex flex-col relative">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-widest text-text-muted bg-white/5 rounded border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 
            className="text-2xl font-display font-bold text-text-primary mb-3 leading-tight tracking-tight group-hover/card:text-primary transition-colors duration-500"
            style={{ color: project.isPinned ? accentColor : 'inherit' }}
          >
            {project.name}
          </h3>
          
          <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed font-body mb-8 opacity-70">
            {project.description}
          </p>

          <div className="mt-auto flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted group-hover/card:text-text-primary transition-colors duration-500">
            <span>View Case Study</span>
            <div className="w-8 h-px bg-white/20 group-hover/card:w-12 group-hover/card:bg-primary transition-all duration-500" />
          </div>
        </div>

        {/* Navigation Link */}
        <Link 
          href={`/projects/${projectSlug}`} 
          className="absolute inset-0 z-40"
          aria-label={project.name}
        />
      </SpotlightCard>
    </motion.div>
  );
}
