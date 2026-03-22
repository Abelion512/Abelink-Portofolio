"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Calendar, Award, CheckCircle2, Trophy } from "lucide-react";
import Link from "next/link";
import { useLangStore } from "@/store/languageStore";

export type AchievementType = "cert" | "part" | "award";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: AchievementType;
  image?: string;
  url?: string;
  is_visible: boolean;
}

export default function AchievementsGrid({ initialAchievements }: { initialAchievements?: Achievement[] }) {
  const { t } = useLangStore();
  const [filter, setFilter] = useState<"all" | AchievementType>("all");

  const displayAchievements = initialAchievements || [];
  const filtered = displayAchievements.filter(a => 
    filter === "all" ? true : a.type === filter
  );

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "cert", "part", "award"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border ${
              filter === type 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-surface/50 text-text-secondary border-border/50 hover:bg-surface hover:text-text-primary"
            }`}
          >
            {type === 'cert' ? t('achievements.filter.certs') : 
             type === 'part' ? t('achievements.filter.participation') : 
             type === 'award' ? t('achievements.filter.awards') : t('common.all')}
          </button>
        ))}
      </div>

      {/* Masonry Grid Simulation */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-text-secondary opacity-50">
          <Trophy size={48} className="mb-4" />
          <p className="font-mono text-sm uppercase tracking-widest">No achievements found</p>
        </div>
      )}
    </div>
  );
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { t } = useLangStore();
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="break-inside-avoid mb-6 group relative glass border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500"
    >
      <div className="relative aspect-[4/3] bg-surface/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-40 group-hover:scale-110 transition-transform duration-700" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/10 bg-black/20 text-white flex items-center gap-1.5">
          {achievement.type === 'cert' ? <Award size={12} className="text-gold" /> : <CheckCircle2 size={12} className="text-accent" />}
          {achievement.type}
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
          <Award size={100} />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary uppercase tracking-widest mb-2">
          <Calendar size={12} />
          {new Date(achievement.date).getFullYear()}
        </div>
        
        <h3 className="text-lg font-display font-bold text-text-primary mb-1 leading-tight group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        
        <p className="text-sm text-text-secondary mb-6 font-body">
          {achievement.issuer}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {achievement.url ? (
            <Link 
              href={achievement.url} 
              target="_blank"
              className="flex items-center gap-2 text-xs font-bold text-primary hover:underline transition-all"
            >
              {t('achievements.verify')} <ExternalLink size={14} />
            </Link>
          ) : (
            <span className="text-[10px] font-mono text-text-secondary/50 uppercase tracking-tighter">Verified Achievement</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
