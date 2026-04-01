"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, Trophy, ExternalLink } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import AchievementModal from "@/components/ui/AchievementModal";
import { supabase } from "@/lib/supabase";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface AchievementRecord {
  id: string;
  title: string;
  issuer?: string;
  year?: number;
  type?: string;
  image_path?: string;
  credential_url?: string;
  is_visible: boolean;
}

export type AchievementType = "certificate" | "participation";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: AchievementType;
  category?: string;
  credential_id?: string;
  image_path: string;
  url?: string;
  is_visible: boolean;
}

export default function AchievementsGrid({ initialAchievements }: { initialAchievements?: Achievement[] }) {
  const { t } = useLangStore();
  const [filter, setFilter] = useState<"all" | AchievementType>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [prevInitial, setPrevInitial] = useState(initialAchievements);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements || []);

  if (initialAchievements !== prevInitial) {
    setPrevInitial(initialAchievements);
    setAchievements(initialAchievements || []);
  }

  useEffect(() => {
    const channel = supabase
      .channel('achievements_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'achievements' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as AchievementRecord;
            const mappedItem: Achievement = {
              id: newItem.id,
              title: newItem.title,
              issuer: newItem.issuer || "Unknown",
              year: newItem.year || 2024,
              type: (newItem.type || 'certificate') as AchievementType,
              category: (newItem as any).category || "Premium",
              credential_id: (newItem as any).credential_id || undefined,
              image_path: newItem.image_path || "",
              url: newItem.credential_url || undefined,
              is_visible: newItem.is_visible,
            };
            setAchievements((prev) => [mappedItem, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new as AchievementRecord;
            setAchievements((prev) => prev.map((item) => (item.id === updatedItem.id ? {
              ...item,
              title: updatedItem.title,
              issuer: updatedItem.issuer || item.issuer,
              year: updatedItem.year || item.year,
              type: (updatedItem.type || item.type) as AchievementType,
              category: (updatedItem as any).category || item.category,
              credential_id: (updatedItem as any).credential_id || item.credential_id,
              image_path: updatedItem.image_path || item.image_path,
              url: updatedItem.credential_url || item.url,
              is_visible: updatedItem.is_visible,
            } : item)));
          } else if (payload.eventType === 'DELETE') {
            const oldId = (payload.old as { id: string }).id;
            setAchievements((prev) => prev.filter((item) => item.id !== oldId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialAchievements]);

  const filtered = achievements.filter(a => 
    filter === "all" ? true : a.type === filter
  );

  return (
    <div className="space-y-12">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {(["all", "certificate", "participation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-8 py-3 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] transition-all border ${
              filter === type 
                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                : "bg-white/5 text-text-secondary border-white/5 hover:bg-white/10 hover:text-text-primary"
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
          <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-white/5">
            {achievement.image_path ? (
              <div className="w-full h-full relative p-4 group-hover:scale-105 transition-transform duration-700">
                <Image 
                  src={achievement.image_path} 
                  alt={achievement.title}
                  fill
                  className="object-contain p-4 drop-shadow-2xl"
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
