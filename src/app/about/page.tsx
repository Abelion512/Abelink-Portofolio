"use client";

import { motion } from "motion/react";
import { useLangStore } from "@/store/languageStore";

export default function AboutPage() {
  const { t } = useLangStore();

  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl md:text-8xl font-display font-bold mb-12 italic tracking-tight">
          {t('about.title')}
        </h1>
        
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8 space-y-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-body leading-relaxed text-[--color-text-primary]"
            >
              {t('about.p1')}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-body leading-relaxed text-[--color-text-secondary]"
            >
              {t('about.p2')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-[2.5rem] glass border border-[--color-border]/50 bg-surface/30"
            >
              <h3 className="text-xl font-display font-bold mb-4 text-[--color-text-primary] uppercase tracking-widest text-xs">
                {t('about.tech')}
              </h3>
              <p className="text-lg font-mono text-[--color-accent] leading-relaxed">
                Next.js 16, TypeScript, n8n, Supabase, Docker, Linux Architecture, & AI Automation.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-4 sticky top-32">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden glass border border-[--color-border]/50 bg-surface/50 flex items-center justify-center relative group">
              <span className="text-[--color-text-muted] italic group-hover:scale-105 transition-transform duration-1000">
                [Photo Asset]
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent opacity-20" />
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
