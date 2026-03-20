import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

async function getSettings() {
  try {
    // Mengecek jika env tidak diisi, maka skip fetch untuk menghindari error 
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return { open_to_work: true, currently_learning: "Next.js 16 & Tailwind v4" };
    }

    const { data, error } = await supabase
      .from("settings")
      .select("open_to_work, currently_learning")
      .limit(1)
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed or empty data, using fallback:", error);
      return { open_to_work: true, currently_learning: "Next.js 16 & Tailwind v4" };
    }

    return data;
  } catch (err) {
    console.error("Error fetching settings:", err);
    return { open_to_work: true, currently_learning: "Next.js 16 & Tailwind v4" };
  }
}

export default async function Home() {
  const settings = await getSettings();

  return (
    <main>
      <Hero 
        openToWork={settings.open_to_work} 
        currentlyLearning={settings.currently_learning} 
      />
      <ProjectsGrid />
    </main>
  );
}
