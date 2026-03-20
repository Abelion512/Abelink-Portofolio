import AchievementsGrid from "@/components/sections/AchievementsGrid";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Achievements | Abelion",
  description: "A collection of my certifications, awards, and milestones in tech.",
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-gold font-mono text-sm tracking-widest uppercase mb-4">
            <Trophy size={18} />
            Milestones
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-text-primary mb-6">
            Achievements & <br />
            <span className="text-gradient">Certifications</span>
          </h1>
          <p className="max-w-2xl text-text-secondary text-lg font-body">
            A curated collection of my professional journey, including certifications, 
            academic achievements, and technical milestones.
          </p>
        </header>

        <AchievementsGrid />
      </div>
    </main>
  );
}
