import AchievementsGrid from "@/components/sections/AchievementsGrid";
import { Trophy } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Achievement, AchievementType } from "@/components/sections/AchievementsGrid";

export const metadata = {
  title: "Achievements | Ihsanuddin Salav",
  description: "Certifications, academic achievements, and technical milestones of Ihsanuddin Salav.",
};

export const revalidate = 3600;

export default async function AchievementsPage() {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false });

const achievementsData: Achievement[] = (data || []).map(a => ({
    id: a.id,
    title: a.title,
    issuer: a.issuer || "Unknown",
    year: a.year || 2024,
    type: (a.type || 'certificate') as AchievementType,
    image_path: a.image_path || undefined,
    url: a.credential_url || undefined,
    is_visible: a.is_visible,
  }));

  if (error) {
    console.error("Supabase fetch error achievements:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Trophy size={14} />
            Milestones
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text-primary mb-6">
            Prouds & <br />
            <span className="text-gradient">Certifications</span>
          </h1>
          <p className="max-w-2xl text-text-secondary text-lg font-body leading-relaxed">
            A curated record of my professional growth, technical validations, 
            and various recognitions in the field of technology and beyond.
          </p>
        </header>

        <AchievementsGrid initialAchievements={achievementsData} />
      </div>
    </main>
  );
}
