"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, Trophy, ExternalLink } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import AchievementModal from "@/components/ui/AchievementModal";
import SpotlightCard from "@/components/ui/SpotlightCard";


export type AchievementType = "certificate" | "participation";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: AchievementType;
  category?: string;
  credential_id?: string;
  image_path?: string;
  url?: string;
  is_visible: boolean;
}

const CERT_DATA: Achievement[] = [
  {
    id: "dicoding-financial",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding × DBS Foundation",
    year: 2026,
    type: "certificate",
    image_path: "/certs/dicoding-financial-literacy.jpg",
    url: "https://dicoding.com/certificates/1RXYQ9NRQZVM",
    is_visible: true,
    category: "Software Engineering"
  },
  {
    id: "ibm-gen-ai",
    title: "Use Generative AI for Software Development",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image_path: "/certs/ibm-genai-software-dev.jpg",
    url: "#",
    is_visible: true,
    category: "Software Engineering"
  },
  {
    id: "dicoding-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: 2026,
    type: "certificate",
    image_path: "/certs/dicoding-dasar-ai.jpg",
    url: "https://dicoding.com/certificates/QLZ9RD0Q0Z5D",
    is_visible: true,
    category: "Software Engineering"
  },
  {
    id: "ibm-granite",
    title: "Getting Started with IBM Granite Models",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image_path: "/certs/ibm-granite-models.jpg",
    url: "#",
    is_visible: true,
    category: "Software Engineering"
  },
  {
    id: "dibimbing-rpa",
    title: "Robotic Process Automation",
    issuer: "Dibimbing.id",
    year: 2024,
    type: "certificate",
    image_path: "/certs/dibimbing-rpa.jpg",
    url: "#",
    is_visible: true,
    category: "Automation"
  },
  {
    id: "dibimbing-devops",
    title: "DevOps Engineering",
    issuer: "Dibimbing.id",
    year: 2024,
    type: "certificate",
    image_path: "/certs/dibimbing-devops.jpg",
    url: "#",
    is_visible: true,
    category: "Infrastructure"
  }
];

export default function AchievementsGrid({ initialAchievements }: { initialAchievements?: Achievement[] }) {
  const { t } = useLangStore();
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<"all" | AchievementType>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const achievements = initialAchievements || CERT_DATA;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = achievements.filter(a => 
    filter === "all" ? true : a.type === filter
  );

  return (
    <div className="space-y-12">
      {/* Filter Tabs (Multi-Pill Style) */}
      <div className="flex flex-wrap gap-2 justify-center mb-16 p-1.5 rounded-2xl glass-liquid w-fit mx-auto border-white/10">
        {(["all", "certificate", "participation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-[0.3em] transition-all active-haptic ${
              filter === type 
                ? "bg-primary/20 text-white border border-primary/30 shadow-lg shadow-primary/10" 
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            {type === 'certificate' ? t('achievements.filter.certificate') : 
             type === 'participation' ? t('achievements.filter.participation') : 
             t('common.all')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((achievement) => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              onSelect={() => setSelectedAchievement(achievement)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal 
            achievement={selectedAchievement} 
            onClose={() => setSelectedAchievement(null)} 
          />
        )}
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-text-secondary opacity-30">
          <Trophy size={64} strokeWidth={1} className="mb-6" />
          <p className="font-mono text-xs uppercase tracking-[0.4em]">No achievements listed</p>
        </div>
      )}
    </div>
  );
}

function AchievementCard({ achievement, onSelect }: { achievement: Achievement; onSelect: () => void }) {
  const { t } = useLangStore();
  
  // Gold/Amber theme for achievements
  const goldColor = "#F59E0B";

  return (
    <motion.div
      layoutId={`card-${achievement.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard 
        color={goldColor} 
        className="h-full group cursor-pointer"
      >
        <div onClick={onSelect}>
          <div className="relative aspect-video overflow-hidden bg-black/60">
            {achievement.image_path ? (
              <div className="w-full h-full relative group-hover:scale-110 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]">
                <Image 
                   src={achievement.image_path.replace(/^\/?public\//, '/')} 
                   alt={achievement.title}
                   fill
                   className="object-cover"
                   priority
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Award size={48} strokeWidth={1} className="text-white/10" />
              </div>
            )}
            
            {/* Type Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[8px] font-mono font-bold uppercase tracking-widest text-amber-400">
                {achievement.type}
              </span>
            </div>

            {/* Hover Indicator */}
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
              <div className="flex items-center gap-2 px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <ExternalLink size={12} />
                {t('common.viewDetail')}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center gap-2 text-[10px] font-mono text-amber-500/80 uppercase tracking-widest">
                <Calendar size={12} className="opacity-50" />
                {achievement.year}
              </span>
              <Trophy size={14} className="text-amber-500/40" />
            </div>
            
            <h3 className="text-lg font-display font-bold text-text-primary mb-2 leading-tight group-hover:text-amber-400 transition-colors">
              {achievement.title}
            </h3>
            
            <p className="text-xs text-text-muted font-medium font-body mb-4 line-clamp-1">
              {achievement.issuer}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
