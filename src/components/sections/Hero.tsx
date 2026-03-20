"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles, Bot, Github, Instagram, Mail, LayoutGrid, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroProps {
  openToWork: boolean;
  currentlyLearning: string;
}

export default function Hero({ 
  openToWork = true, 
  currentlyLearning = "Next.js 16 & Tailwind v4" 
}: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10"
      >
        {/* Left Column: Content */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          {/* 1. Status Badge (delay: 0) */}
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/50 bg-surface/30">
              <span className={`w-2.5 h-2.5 rounded-full ${openToWork ? 'bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]' : 'bg-text-secondary opacity-50'}`} />
              <span className="text-[11px] font-mono tracking-wider uppercase text-text-primary">
                {openToWork ? "Open to collaborate" : "Currently busy"}
              </span>
            </div>
          </motion.div>

          {/* 2. Headline: Abelion (delay: 0.1) */}
          <motion.div variants={item} className="mb-2">
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-text-primary">
              Abelion.
            </h1>
          </motion.div>

          {/* 3. Tagline: Student. Builder. Learner. (delay: 0.2) */}
          <motion.div variants={item} className="mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-primary tracking-wide">
              Student. Builder. Learner.
            </h2>
          </motion.div>

          {/* 4. Bio Text (delay: 0.3) */}
          <motion.div variants={item} className="max-w-xl mb-8">
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-body">
              "Second-semester student from Surabaya building things with AI & web tech."
            </p>
          </motion.div>

          {/* 5. Currently Learning (delay: 0.4) */}
          <motion.div variants={item} className="mb-10 group">
            <div className="flex items-center gap-3 text-sm text-text-secondary font-mono">
              <span className="p-2 rounded-lg bg-surface/50 border border-border/50 text-primary group-hover:bg-primary/10 transition-colors">
                <Sparkles size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-text-secondary/60">Currently Learning</span>
                <span className="text-text-primary">{currentlyLearning}</span>
              </div>
            </div>
          </motion.div>

          {/* 6. CTA Buttons (delay: 0.5) */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
            <Link 
              href="/projects" 
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              See my work <ArrowRight size={20} className="group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/achievements" 
              className="px-8 py-4 glass border border-border text-text-primary rounded-2xl font-bold flex items-center gap-2 hover:bg-surface/50 hover:-translate-y-1 transition-all duration-300"
            >
              <Trophy size={20} className="text-gold" /> View achievements
            </Link>
          </motion.div>

          {/* 7. Social & ListenBrainz (delay: 0.6) */}
          <motion.div variants={item} className="flex flex-col gap-6 w-full">
            <div className="flex items-center gap-6">
              {[
                { icon: <Github size={20} />, href: "https://github.com/Abelion512", label: "GitHub" },
                { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
                { icon: <Mail size={20} />, href: "mailto:hello@abelion.me", label: "Email" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href}
                  className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">{social.icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest hidden sm:block">{social.label}</span>
                </Link>
              ))}
            </div>

            {/* Now Playing Placeholder (ListenBrainz) */}
            <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-surface/20 border border-border/30 w-fit max-w-full">
              <span className="text-primary animate-pulse italic">♪</span>
              <span className="text-xs font-mono text-text-secondary truncate">
                Silence is golden — The Sound of Coding
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Avatar/Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-4 relative flex items-center justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
            {/* Glossy Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl transform -rotate-6" />
            
            {/* Avatar Container */}
            <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-surface/40 backdrop-blur-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Placeholder Branding */}
              <div className="absolute inset-0 flex items-center justify-center flex-col select-none">
                <span className="font-display font-black text-6xl text-white/5 tracking-tighter uppercase italic">
                  Abelink
                </span>
                <span className="text-[10px] font-mono text-white/10 tracking-[1em] mt-2">
                  POWERED BY OLIVX
                </span>
              </div>

              {/* Real Image would go here: <Image src="..." fill ... /> */}
            </div>

            {/* Floating Elements (Subtle) */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl glass border border-white/10 shadow-xl animate-float">
              <Bot size={32} className="text-accent" />
            </div>
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass border border-white/10 shadow-xl animate-float-delayed">
              <LayoutGrid size={32} className="text-primary" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
