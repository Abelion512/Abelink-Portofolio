import Hero from "@/components/sections/Hero";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

async function getSettings() {
  try {
    // Selalu coba fetch data jika URL tersedia
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn("Supabase URL is missing, using default values.");
      return { open_to_work: true, currently_learning: "Next.js 16 & AI Automation" };
    }

    const { data, error } = await supabase
      .from("settings")
      .select("open_to_work, currently_learning")
      .limit(1)
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed or empty data, using fallback:", error);
      return { open_to_work: true, currently_learning: "Next.js 16 & AI Automation" };
    }

    return data;
  } catch (err) {
    console.error("Error fetching settings:", err);
    return { open_to_work: true, currently_learning: "Next.js 16 & AI Automation" };
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
    </main>
  );
}
