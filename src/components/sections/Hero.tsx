"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, Github, Instagram, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useLangStore } from "@/store/languageStore";
import EasterEggName from "@/components/ui/EasterEggName";

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

interface HeroProps {
  openToWork?: boolean;
  currentlyLearning?: string;
}

export default function Hero({ 
  openToWork = true, 
  currentlyLearning = "Next.js 16 & AI Automation" 
}: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const { t } = useLangStore();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Hydration fix: keep the min-height wrapper to avoid CLS
  const showContent = mounted;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* 3D Background Scene (PRD §8) */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={showContent ? "show" : "hidden"}
        className="w-full max-w-7xl mx-auto z-10"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* 1. Status Badge */}
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/50 bg-surface/30">
              <span className={`w-2 h-2 rounded-full ${openToWork ? 'bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]' : 'bg-text-secondary opacity-50'}`} />
              <span className="text-[10px] font-mono tracking-widest uppercase text-text-primary">
                {openToWork ? t('hero.status.open') : t('contact.unavailable')}
              </span>
            </div>
          </motion.div>

          {/* 2. Headline with Easter Egg */}
          <motion.div variants={item} className="mb-4">
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text-primary">
              {t('hero.greeting')}{" "}
              <EasterEggName />
            </h1>
          </motion.div>

          {/* 3. Tagline */}
          <motion.div variants={item} className="mb-6">
            <h2 className="text-xl md:text-3xl font-display font-bold text-primary tracking-tight">
              {t('hero.tagline')}
            </h2>
          </motion.div>

          {/* 4. Bio Text */}
          <motion.div variants={item} className="max-w-2xl mx-auto mb-10">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-body">
              {t('hero.desc')}
            </p>
          </motion.div>

          {/* 5. Currently Learning */}
          <motion.div variants={item} className="mb-12 group">
            <div className="flex items-center gap-4 text-sm text-text-secondary font-mono">
              <span className="p-2.5 rounded-xl bg-surface/50 border border-border/50 text-primary group-hover:bg-primary/10 transition-colors">
                <Sparkles size={18} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-text-secondary/60 mb-0.5">{t('hero.learning.label')}</span>
                <span className="text-text-primary font-bold">{currentlyLearning}</span>
              </div>
            </div>
          </motion.div>

          {/* 6. CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-4 mb-16">
            <Link 
              href="/projects" 
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              {t('hero.cta.work')} <ArrowRight size={20} />
            </Link>
            <Link 
              href="/chat" 
              className="px-8 py-4 glass border border-border text-text-primary rounded-2xl font-bold flex items-center gap-2 hover:bg-surface/50 hover:-translate-y-1 transition-all duration-300"
            >
              <Sparkles size={20} className="text-primary" /> {t('hero.cta.chat')}
            </Link>
          </motion.div>

          {/* 7. Social Links */}
          <motion.div variants={item} className="flex items-center justify-center gap-8">
            {[
              { icon: <Github size={22} />, href: "https://github.com/Abelion512", label: "GitHub" },
              { icon: <Instagram size={22} />, href: "https://instagram.com/ihsanovid", label: "Instagram" },
              { icon: <Mail size={22} />, href: "mailto:agen.salva@gmail.com", label: "Email" }
            ].map((social, i) => (
              <Link 
                key={i} 
                href={social.href}
                className="text-text-secondary hover:text-primary transition-all duration-300 transform hover:scale-110"
                title={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Background Accent Lines */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </section>
  );
}
