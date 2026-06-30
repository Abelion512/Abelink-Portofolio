"use client";

import { motion } from "motion/react";
import { useProjects } from "@/hooks/useData";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { site } from "@/config/site";
import { SkeletonGrid } from "@/components/ui/Skeleton";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();

  return (
    <>

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {loading ? (
            <div className="py-8">
              <SkeletonGrid count={6} />
            </div>
          ) : error ? (
            <div className="text-center py-40 bg-red-500/5 rounded-[3rem] border border-red-500/10">
              <p className="text-red-400 font-display font-bold text-xl mb-2">Architectural Error</p>
              <p className="text-text-secondary text-sm font-mono uppercase tracking-widest">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-40 bg-surface/30 rounded-[3rem] border border-white/5">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-surface/50 border border-white/5 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold text-text-primary mb-4 tracking-tight">
                Blueprint in Progress
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                The laboratory is currently processing new innovations. Check back shortly for the latest releases.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          ) : (
            <ProjectsGrid initialProjects={projects} />
          )}
        </motion.div>
      </main>
    </>
  );
}
