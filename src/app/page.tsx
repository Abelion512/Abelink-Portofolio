import Hero from "@/components/sections/Hero";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate every minute

async function getSettings() {
  try {
    // Mengecek jika env tidak diisi, maka skip fetch untuk menghindari error 
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
      return { open_to_work: true, currently_learning: "Advanced System Architecture" };
    }

    const { data, error } = await supabase
      .from("settings")
      .select("open_to_work, currently_learning")
      .limit(1)
      .single();

    if (error || !data) {
      console.warn("Supabase fetch failed or empty data, using fallback:", error);
      return { open_to_work: true, currently_learning: "Advanced System Architecture" };
    }

    return data;
  } catch (err) {
    console.error("Error fetching settings:", err);
    return { open_to_work: true, currently_learning: "Advanced System Architecture" };
  }
}

export default async function Home() {
  const settings = await getSettings();

  return (
    <Hero 
      openToWork={settings.open_to_work} 
      currentlyLearning={settings.currently_learning} 
    />
  );
}
