"use client";

import { motion } from "motion/react";
import { projects, Project } from "@/data/projects";
import { Github, ExternalLink, Code2, LayoutGrid, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectsGridProps {
  initialProjects?: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const displayProjects = initialProjects || projects;

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <h2 className="text-sm font-mono text-primary uppercase tracking-[0.3em] mb-4">
              Selected Works
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
              Featured Projects
            </h3>
          </div>
          <p className="max-w-md text-text-secondary font-body">
            A collection of my recent projects, from AI experiments to fullstack web applications.
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
            <span>VIEW ALL ON GITHUB</span>
            <Github size={16} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const statusColors = {
    live: "bg-[#1D9E75]/20 border-[#1D9E75]/30 text-[#1D9E75]",
    wip: "bg-[#BA7517]/20 border-[#BA7517]/30 text-[#BA7517]",
    preview: "bg-[#6C63FF]/20 border-[#6C63FF]/30 text-[#6C63FF]",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col glass border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500"
    >
      {/* 16:9 Aspect Ratio Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface/50">
        {/* Status Badge */}
        <div className={`absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${statusColors[project.status as keyof typeof statusColors]}`}>
          {project.status}
        </div>
        
        {/* Placeholder Gradient if image missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-base opacity-40 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
          <Code2 size={64} className="text-primary" />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
            {project.name}
          </h4>
          <div className="text-text-secondary group-hover:text-primary transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <ExternalLink size={16} />
          </div>
        </div>
        
        <p className="text-sm text-text-secondary line-clamp-2 mb-6 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t: string) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-surface/80 border border-border/50 text-[10px] font-mono text-text-secondary">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          {project.githubUrl && (
            <Link 
              href={project.githubUrl} 
              target="_blank"
              className="text-text-secondary hover:text-text-primary transition-colors p-2 glass border border-border/50 rounded-xl"
            >
              <Github size={18} />
            </Link>
          )}
          {project.liveUrl && (
            <Link 
              href={project.liveUrl} 
              target="_blank"
              className="px-4 py-2 bg-base/50 border border-border/50 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-all"
            >
              LIVE PREVIEW
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
