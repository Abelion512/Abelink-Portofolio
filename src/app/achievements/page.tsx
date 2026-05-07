"use client";

import { motion } from "motion/react";
import { useAchievements } from "@/hooks/useData";
import AchievementsGrid from "@/components/sections/AchievementsGrid";
import Link from "next/link";

export default function AchievementsPage() {
  const { achievements, loading, error } = useAchievements();

  return (
    <>

      <main className="relative z-10 pt-32 px-4 sm:px-6 max-w-7xl mx-auto mb-16 sm:mb-24 min-h-screen font-inter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.4em] text-text-muted">
                Processing Credentials...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-40 bg-red-500/5 rounded-[3rem] border border-red-500/10">
              <p className="text-red-400 font-display font-bold text-xl mb-2">Protocol Error</p>
              <p className="text-text-secondary text-sm font-mono uppercase tracking-widest">{error}</p>
            </div>
          ) : achievements.length === 0 ? (
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-display font-bold text-text-primary mb-4 tracking-tight">
                Achievements Pending
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
                Verification process in progress. Our systems are currently syncing your latest certifications and honors.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/projects"
                  className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono font-bold uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          ) : (
            <AchievementsGrid initialAchievements={achievements} />
          )}
        </motion.div>
      </main>
    </>
  );
}
