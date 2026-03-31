"use client";

import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";
import FloatingTitle from "@/components/ui/FloatingTitle";
import { useAchievements } from "@/hooks/useData";
import { useState } from "react";

export default function AchievementsPage() {
  const { t } = useLangStore();
  const { achievements, loading, error } = useAchievements();
  const [titleAnimated, setTitleAnimated] = useState(false);

  return (
    <>
      <FloatingTitle
        title={t("achievements.title")}
        subtitle={t("achievements.subtitle")}
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
              <p className="text-text-secondary">Loading achievements...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">Error loading achievements</p>
              <p className="text-text-secondary text-sm">{error}</p>
            </div>
          ) : achievements.length === 0 ? (
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                Achievements Loading
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                Certifications and recognition are being updated. Check back
                soon to see my latest accomplishments!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/stack"
                  className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  View Tech Stack
                </a>
                <a
                  href="/projects"
                  className="px-6 py-3 glass border border-border text-text-primary rounded-2xl font-bold hover:bg-surface/50 transition-all"
                >
                  View Projects
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Achievements Grid - To be implemented */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass border border-border/50 rounded-3xl p-6 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-text-primary mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-text-secondary">
                          {achievement.issuer}
                        </p>
                      </div>
                      {achievement.featured && (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span>{achievement.year}</span>
                      <span>•</span>
                      <span className="capitalize">{achievement.type}</span>
                    </div>
                    {achievement.credential_url && (
                      <a
                        href={achievement.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      >
                        View Credential
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
}
