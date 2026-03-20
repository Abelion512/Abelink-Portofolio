"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { Github, Linkedin, Twitter, ArrowRight, Sparkles, Code2, Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface HeroClientProps {
  openToWork: boolean;
  currentlyLearning: string;
}

export default function Hero({ openToWork, currentlyLearning }: HeroClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optimized DOM query (taken from performance branch)
    const orbs = heroRef.current?.querySelectorAll(".floating-orb");

    const handleMouseMove = (e: MouseEvent) => {
      if (!orbs) return;
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.4;
        const x = (mouseX - 0.5) * speed * 60;
        const y = (mouseY - 0.5) * speed * 60;
        
        if (orb instanceof HTMLElement) {
          orb.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <main 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-olivx-purple/5 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-ai-teal/10 rounded-full blur-[120px] z-0 pointer-events-none" />
      
      {/* Floating Orbs (Parallax) */}
      <div className="floating-orb w-64 h-64 -top-20 -left-20 bg-olivx-purple/20" />
      <div className="floating-orb w-48 h-48 top-1/3 -right-20 bg-ai-teal/20" />
      <div className="floating-orb w-32 h-32 bottom-20 left-1/4 bg-olivx-purple/10" />
      <div className="floating-orb w-40 h-40 bottom-1/4 right-1/4 bg-ai-teal/15" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 z-10"
      >
        {/* Main Intro Card */}
        <motion.div variants={itemVariants} className="md:col-span-8 md:row-span-2 glass border border-border bg-surface/30 rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-14 relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-olivx-purple/10 blur-[80px] rounded-full group-hover:bg-olivx-purple/20 transition-all duration-700" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-base/50 text-[10px] sm:text-xs font-mono text-ai-teal mb-6 md:mb-8 tracking-widest uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-olivx-purple" />
            <span>PORTFOLIO OF IHSANUDDIN SALAV</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-3 leading-[1.1] tracking-tight">
            Abelion
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 text-gradient">
            Student. Builder. Learner.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-xl leading-relaxed mb-8">
            Hi, I&apos;m <span className="text-primary font-medium">Ihsanuddin Salav</span> (Abelion) — a second-semester student based in Surabaya who builds things with AI and web technology. I&apos;m actively learning, collecting certifications, and developing projects under my own name. Driven by curiosity and the goal of contributing to technology that matters.
          </p>

          <div className="flex flex-wrap gap-4 mt-auto">
            <Link href="/projects" className="px-6 py-3 bg-primary text-base rounded-full font-medium hover:shadow-[0_0_20px_rgba(206,176,112,0.3)] transition-all flex items-center gap-2">
              See my work <ArrowRight size={16} />
            </Link>
            <Link href="/chat" className="px-6 py-3 glass border border-border text-primary rounded-full font-medium hover:bg-surface transition-all flex items-center gap-2">
              <Bot size={18} /> Ask Abelink AI
            </Link>
          </div>
        </motion.div>

        {/* Status / Open to Work Card */}
        <motion.div variants={itemVariants} className="md:col-span-4 glass border border-border bg-surface/30 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className={`absolute inset-0 bg-gradient-to-br ${openToWork ? 'from-green-500/5' : 'from-ai-teal/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className={`w-16 h-16 rounded-full ${openToWork ? 'bg-green-500/10 border-green-500/20' : 'bg-ai-teal/10 border-ai-teal/20'} flex items-center justify-center mb-4 border relative`}>
            {openToWork && <div className="absolute w-full h-full rounded-full border border-green-500/30 animate-ping opacity-20" />}
            <div className={`w-4 h-4 rounded-full ${openToWork ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-ai-teal shadow-[0_0_15px_rgba(0,212,170,0.6)]'}`} />
          </div>
          <h3 className="text-xl font-bold font-display mb-2">{openToWork ? "Open to Collaborate" : "Building at OlivX"}</h3>
          <p className="text-sm text-text-secondary">{openToWork ? "Available for AI integration and fullstack automation projects." : "Currently focused on internal projects and system infrastructure."}</p>
        </motion.div>

        {/* Currently Learning Card */}
        <motion.div variants={itemVariants} className="md:col-span-4 glass border border-border bg-surface/30 rounded-[2rem] p-8 group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 group-hover:scale-110 transform">
            <Code2 size={64} className="text-olivx-purple" />
          </div>
          <div className="text-xs font-mono text-olivx-purple mb-4 uppercase tracking-widest">Currently Learning</div>
          <h3 className="text-2xl font-bold font-display mb-2 leading-tight">{currentlyLearning}</h3>
          <p className="text-sm text-text-secondary line-clamp-2">Exploring new paradigms and staying ahead of the curve.</p>
        </motion.div>

        {/* Social / Contact Card */}
        <motion.div variants={itemVariants} className="md:col-span-12 glass border border-border bg-surface/30 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-olivx-purple/30 transition-all duration-300">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-display mb-2">Connect with me</h3>
            <p className="text-sm text-text-secondary">Let&apos;s build something extraordinary together.</p>
          </div>
          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, href: "https://github.com/abelion512" },
              { icon: <Linkedin size={20} />, href: "#" },
              { icon: <Twitter size={20} />, href: "#" },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full glass border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-surface hover:border-primary/30 hover:shadow-[0_0_15px_rgba(206,176,112,0.15)] transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
