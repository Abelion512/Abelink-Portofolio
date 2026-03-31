"use client";

import { motion } from "motion/react";
import { Github, ExternalLink, Globe } from "lucide-react";
import { useLangStore } from "@/store/languageStore";

interface FloatingActionsProps {
  githubUrl?: string;
  liveUrl?: string;
}

export default function FloatingActions({ githubUrl, liveUrl }: FloatingActionsProps) {
  const { t } = useLangStore();

  if (!githubUrl && !liveUrl) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-fit">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-center gap-3 p-2 bg-surface/40 backdrop-blur-3xl border border-border/80 rounded-2xl shadow-2xl shadow-black/80"
      >
        {githubUrl && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-surface-2 border border-border text-text-primary hover:bg-surface-2/80 transition-all font-bold text-sm"
          >
            <Github size={18} />
            <span className="hidden sm:inline">Source Code</span>
            <span className="sm:hidden">GitHub</span>
          </motion.a>
        )}

        {liveUrl && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-light transition-all font-bold text-sm shadow-xl shadow-primary/30"
          >
            <Globe size={18} />
            <span className="hidden sm:inline">Live Preview</span>
            <span className="sm:hidden">Demo</span>
            <ExternalLink size={14} className="opacity-50" />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}
