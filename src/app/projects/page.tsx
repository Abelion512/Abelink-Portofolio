"use client";

import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import FloatingTitle from "@/components/ui/FloatingTitle";
import { useProjects } from "@/hooks/useData";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { useState } from "react";

export default function ProjectsPage() {
  const { t } = useLangStore();
  const { projects, loading, error } = useProjects();
  const [titleAnimated, setTitleAnimated] = useState(false);

  return (
    <>
      <FloatingTitle
        title={t("projects.title")}
        subtitle={t("projects.subtitle")}
        onAnimationComplete={() => setTitleAnimated(true)}
      />

      <main className="pt-16 px-4 sm:px-6 max-w-5xl mx-auto mb-16 sm:mb-24 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: titleAnimated ? 0 : 0.6 }}
        >
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
              <p className="text-text-secondary">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Error loading projects</p>
              <p className="text-text-secondary text-sm">{error}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface/50 border border-border/50 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                Projects Coming Soon
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                I&apos;m currently working on some exciting projects. Check back
                soon to see what I&apos;ve been building!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="https://github.com/Abelion512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass border border-border text-text-primary rounded-2xl font-bold hover:bg-surface/50 transition-all"
                >
                  Check My GitHub
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
