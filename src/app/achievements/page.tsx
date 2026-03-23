"use client";

import AchievementsGrid from "@/components/sections/AchievementsGrid";
import { Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Achievement, AchievementType } from "@/components/sections/AchievementsGrid";
import { useLangStore } from "@/store/languageStore";
import { useEffect, useState } from "react";

export default function AchievementsPage() {
  const { t } = useLangStore();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false }); // Corrected: using created_at for sorting

      if (error) {
        console.error("Supabase fetch error achievements:", error);
      } else {
        const mapped: Achievement[] = (data || []).map(a => ({
          id: a.id,
          title: a.title,
          issuer: a.issuer || "Unknown",
          year: a.year || 2024,
          type: (a.type || 'certificate') as AchievementType,
          image_path: a.image_path || "",
          url: a.credential_url || undefined,
          is_visible: a.is_visible,
          created_at: a.created_at, // Added mapping
        }));
        setAchievements(mapped);
      }
      setLoading(false);
    }
    fetchAchievements();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Trophy size={14} />
            Milestones
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text-primary mb-6">
            {t('achievements.title').split(' ')[0]} <br />
            <span className="text-gradient">{t('achievements.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="max-w-2xl text-text-secondary text-lg font-body leading-relaxed">
            {t('achievements.subtitle')}
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-surface/30 rounded-[2rem] border border-border/50" />
            ))}
          </div>
        ) : (
          <AchievementsGrid initialAchievements={achievements} />
        )}
      </div>
    </main>
  );
}
