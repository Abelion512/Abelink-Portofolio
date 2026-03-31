"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, Trophy } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import AchievementModal from "@/components/ui/AchievementModal";
import { supabase } from "@/lib/supabase";

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
      className="group relative cursor-pointer bg-surface/30 border border-border/50 rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(108,99,255,0.15)] mt-4"
    >
      <div className="relative aspect-[4/3] bg-neutral-900/50 overflow-hidden border-b border-neutral-800/80">
        {achievement.image_path ? (
          <div className="w-full h-full relative p-2">
            <Image 
              src={achievement.image_path} 
              alt={achievement.title}
              width={600}
              height={450}
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Award size={40} className="text-neutral-800" />
          </div>
        )}
        
        {/* Minimal Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
          <div className="px-5 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            {t('common.viewDetail')}
          </div>
        </div>

        {/* Minimal Badge */}
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-tighter border border-white/5 bg-black/60 text-neutral-400 backdrop-blur-sm">
          {achievement.type}
        </div>
      </div>

      <div className="p-4">
        <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <Calendar size={10} /> {achievement.year}
        </div>
        
        <h3 className="text-sm font-bold text-text-primary mb-0.5 leading-tight line-clamp-1 group-hover:text-primary transition-colors font-display">
          {achievement.title}
        </h3>
        
        <p className="text-[11px] text-text-secondary font-medium pb-2 font-body">
          {achievement.issuer}
        </p>
      </div>
    </motion.div>
  );
}
