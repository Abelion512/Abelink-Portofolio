"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, Github, Instagram, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useLangStore } from "@/store/languageStore";
import EasterEggName from "@/components/ui/EasterEggName";
import TypingAnimation from "@/components/ui/TypingAnimation";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

interface HeroProps {
  openToWork?: boolean;
  currentlyLearning?: string;
}

export default function Hero({
  openToWork = true,
  currentlyLearning = "Next.js 16 & AI Automation",
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
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-12 overflow-hidden">
      {/* 3D Background Scene (PRD §8) */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Decorative Overlays */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
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
              <span
                className={`w-2 h-2 rounded-full ${openToWork ? "bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" : "bg-text-secondary opacity-50"}`}
              />
              <span 
                suppressHydrationWarning
                className="text-[10px] font-mono tracking-widest uppercase text-text-primary"
              >
                {openToWork ? t("hero.status.open") : t("contact.unavailable")}
              </span>
            </div>
          </motion.div>

          {/* 2. Headline with Easter Egg - Fixed typography hierarchy */}
          <motion.div variants={item} className="mb-4">
            <h1 
              suppressHydrationWarning
              className="text-2xl md:text-4xl font-display font-bold tracking-tight text-text-secondary inline-block mr-3"
            >
              {t("hero.greeting")}
            </h1>
            <EasterEggName />
          </motion.div>

          {/* 3. Tagline with Typing Animation */}
          <motion.div variants={item} className="mb-6 h-10">
            <TypingAnimation
              texts={[
                t("hero.tagline"),
                "Fullstack Developer",
                "AI Enthusiast",
                "Linux Lover",
                "Open Source Contributor",
              ]}
              className="text-xl md:text-3xl font-display font-bold text-primary tracking-tight"
            />
          </motion.div>

          {/* 4. Bio Text */}
          <motion.div variants={item} className="max-w-2xl mx-auto mb-10">
            <p 
              suppressHydrationWarning
              className="text-lg md:text-xl text-text-secondary leading-relaxed font-body"
            >
              {t("hero.desc")}
            </p>
          </motion.div>

          {/* 5. Currently Learning - Hidden on mobile for cleaner first impression */}
          <motion.div
            variants={item}
            className="mb-8 md:mb-12 group hidden md:block"
          >
            <div className="flex items-center gap-4 text-sm text-text-secondary font-mono">
              <div className="flex flex-col">
                <span 
                  suppressHydrationWarning
                  className="text-[9px] uppercase tracking-[0.2em] text-text-secondary/60 mb-0.5"
                >
                  {t("hero.learning.label")}
                </span>
                <span 
                  suppressHydrationWarning
                  className="text-text-primary font-bold"
                >
                  {currentlyLearning ||
                    t("hero.learning.none") ||
                    "No active learning tracked"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 6. CTA Buttons - See my work only with enhanced animation */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <Link
              href="/projects"
              className="group px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 relative overflow-hidden hover:shadow-[0_0_40px_rgba(108,99,255,0.5)] hover:-translate-y-1 transition-all duration-300"
            >
              <span 
                suppressHydrationWarning
                className="relative z-10 flex items-center gap-2"
              >
                {t("hero.cta.work")}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-full group-hover:inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ease-in-out" />
            </Link>
          </motion.div>

          {/* 7. Social Links - Smaller on mobile, hidden on very small screens */}
          <motion.div
            variants={item}
            className="flex items-center justify-center gap-6 md:gap-8"
          >
            {[
              {
                icon: <Github size={20} className="md:w-6 md:h-6" />,
                href: "https://github.com/Abelion512",
                label: "GitHub",
              },
              {
                icon: <Instagram size={20} className="md:w-6 md:h-6" />,
                href: "https://instagram.com/ihsanovid",
                label: "Instagram",
              },
              {
                icon: <Mail size={20} className="md:w-6 md:h-6" />,
                href: "mailto:agen.salva@gmail.com",
                label: "Email",
              },
            ].map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="p-3 sm:p-2 text-text-secondary hover:text-primary transition-all duration-300 transform hover:scale-110 min-w-11 min-h-11 flex items-center justify-center"
                title={social.label}
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-text-secondary/40">
              <span className="text-[9px] uppercase tracking-[0.2em]">
                Scroll
              </span>
              <ChevronDown size={20} className="animate-bounce" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Accent Lines */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />
    </section>
  );
}
