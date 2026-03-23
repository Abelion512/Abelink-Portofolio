"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Calendar, Award, Trophy } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import AchievementModal from "@/components/ui/AchievementModal";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export type AchievementType = "certificate" | "participation";

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: AchievementType;
  image_path: string;
  url?: string;
  is_visible: boolean;
}

export default function AchievementsGrid({ initialAchievements }: { initialAchievements?: Achievement[] }) {
  const { t } = useLangStore();
  const [filter, setFilter] = useState<"all" | AchievementType>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements || []);

  useEffect(() => {
    // Sync with initialAchievements if they change (e.g. from parent)
    if (initialAchievements) {
      setAchievements(initialAchievements);
    }

    const channel = supabase
      .channel('achievements_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'achievements' },
        (payload: RealtimePostgresChangesPayload<any>) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new;
            const mappedItem: Achievement = {
              id: newItem.id,
              title: newItem.title,
              issuer: newItem.issuer || "Unknown",
              year: newItem.year || 2024,
              type: (newItem.type || 'certificate') as AchievementType,
              image_path: newItem.image_path || "",
              url: newItem.credential_url || undefined,
              is_visible: newItem.is_visible,
            };
            setAchievements((prev) => [mappedItem, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new;
            setAchievements((prev) => prev.map((item) => (item.id === updatedItem.id ? {
              ...item,
              title: updatedItem.title,
              issuer: updatedItem.issuer || item.issuer,
              year: updatedItem.year || item.year,
              type: (updatedItem.type || item.type) as AchievementType,
              image_path: updatedItem.image_path || item.image_path,
              url: updatedItem.credential_url || item.url,
              is_visible: updatedItem.is_visible,
            } : item)));
          } else if (payload.eventType === 'DELETE') {
            setAchievements((prev) => prev.filter((item) => item.id === payload.old.id));
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
      <div className="flex flex-wrap gap-2">
        {(["all", "certificate", "participation"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all border ${
              filter === type 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-surface/50 text-text-secondary border-border/50 hover:bg-surface hover:text-text-primary"
            }`}
          >
            {type === 'certificate' ? t('achievements.filter.certificate') : 
             type === 'participation' ? t('achievements.filter.participation') : 
             t('common.all')}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex flex-col items-center justify-center py-20 text-text-secondary opacity-50">
          <Trophy size={48} className="mb-4" />
          <p className="font-mono text-sm uppercase tracking-widest">No achievements found</p>
        </div>
      )}
    </div>
  );
}

function AchievementCard({ achievement, onSelect }: { achievement: Achievement; onSelect: () => void }) {
  const { t } = useLangStore();
  
  return (
    <motion.div
      layoutId={`card-${achievement.id}`}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="group relative cursor-pointer bg-[#0a0a0c] border border-neutral-800/80 rounded-[2rem] overflow-hidden hover:border-neutral-600 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)] mt-4"
    >
      <div className="relative aspect-[4/3] bg-neutral-900/50 overflow-hidden border-b border-neutral-800/80">
        {achievement.image_path ? (
          <motion.img 
            layoutId={`image-${achievement.id}`}
            src={achievement.image_path} 
            alt={achievement.title}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Award size={40} className="text-neutral-800" />
          </div>
        )}
        
        {/* Minimal Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <div className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {t('common.viewDetail') || 'View Detail'}
          </div>
        </div>

        {/* Minimal Badge */}
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-tighter border border-white/5 bg-black/60 text-neutral-400 backdrop-blur-sm">
          {achievement.type}
        </div>
      </div>

      <div className="p-4">
        <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <Calendar size={10} /> {achievement.year}
        </div>
        
        <h3 className="text-sm font-bold text-neutral-200 mb-0.5 leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {achievement.title}
        </h3>
        
        <p className="text-[11px] text-neutral-500 font-medium pb-2">
          {achievement.issuer}
        </p>
      </div>
    </motion.div>
  );
}
