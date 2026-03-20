import { Metadata } from "next";
import BioToggle from "@/components/features/about/BioToggle";

export const metadata: Metadata = {
  title: "About | Abelion — Student. Builder. Learner.",
  description: "Ihsanuddin Salav from Surabaya — building things with AI and web tech.",
};

export default function AboutPage() {
  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-display font-bold mb-8 italic">About <span className="text-gradient">Abelion</span></h1>
      
      <BioToggle />
    </main>
  );
}
