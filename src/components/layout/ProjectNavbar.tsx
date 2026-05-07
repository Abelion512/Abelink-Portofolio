"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { useLangStore } from "@/store/languageStore";

interface ProjectNavbarProps {
  title: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectNavbar({ title, githubUrl, liveUrl }: ProjectNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLangStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show title/sticky effect after scrolling 300px (hero height)
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-base/80 backdrop-blur-2xl border-b border-border/50 py-3 shadow-2xl shadow-black/50" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Back Button & Title */}
        <div className="flex items-center gap-4">
          <Link 
            href="/projects"
            className="p-2.5 rounded-full glass hover:bg-primary/20 hover:border-primary/50 transition-all group"
            title={t("nav.back") || "Back"}
          >
            <ArrowLeft size={20} className="text-text-primary group-hover:-translate-x-1 transition-transform" />
          </Link>
          
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="hidden md:block"
              >
                <h1 className="font-display font-bold text-lg text-text-primary truncate max-w-[300px]">
                  {title}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Quick Actions (Desktop only, duplicate of floating) */}
        <div className="hidden sm:flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-xl glass hover:bg-surface/50 transition-all flex items-center gap-2 border border-white/5"
            >
              <Github size={14} />
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary-light transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
