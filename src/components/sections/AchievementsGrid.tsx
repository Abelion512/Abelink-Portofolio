"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { achievements, Achievement } from "@/data/achievements";
import { ExternalLink, Calendar, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AchievementsGrid() {
  const [filter, setFilter] = useState<"all" | "certificate" | "participation">("all");

  const filtered = achievements.filter(a => 
    filter === "all" ? true : a.type === filter
  );

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "certificate", "participation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-mono uppercase tracking-wider transition-all border ${
              filter === type 
                ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(108,99,255,0.3)]" 
                : "bg-surface/50 text-text-secondary border-border/50 hover:bg-surface hover:text-text-primary"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6 group relative glass border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500"
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-[4/3] bg-surface/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-40 group-hover:scale-110 transition-transform duration-700" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 bg-black/20 text-white flex items-center gap-1.5">
          {achievement.type === 'certificate' ? <Award size={12} className="text-gold" /> : <CheckCircle2 size={12} className="text-accent" />}
          {achievement.type}
        </div>

        {/* Featured Badge */}
        {achievement.featured && (
          <div className="absolute top-4 right-4 z-10 p-1.5 rounded-full backdrop-blur-md bg-gold/20 border border-gold/30 text-gold">
            <Award size={14} />
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
          <TrophyIcon size={120} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
          <Calendar size={12} />
          {achievement.year}
        </div>
        
        <h3 className="text-lg font-display font-bold text-text-primary mb-1 leading-tight group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        
        <p className="text-sm text-text-secondary mb-6 font-body">
          {achievement.issuer}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {achievement.credentialUrl ? (
            <Link 
              href={achievement.credentialUrl} 
              target="_blank"
              className="flex items-center gap-2 text-xs font-bold text-primary hover:underline transition-all"
            >
              VERIFY CREDENTIAL <ExternalLink size={14} />
            </Link>
          ) : (
            <span className="text-[10px] font-mono text-text-secondary/50 uppercase">Verified Badge</span>
          )}
          
          {achievement.validUntil && (
            <span className="text-[9px] font-mono text-text-secondary/40">
              UNTIL {achievement.validUntil.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TrophyIcon({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
