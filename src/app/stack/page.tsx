"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useLangStore } from "@/store/languageStore";

interface StackItem {
  id: string;
  category: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
}

const LOGO_MAPPING: Record<string, string> = {
  "Next.js": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Next.js/Next.js.png",
  "React": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/React/React.png",
  "Tailwind CSS v4": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Tailwindcss/Tailwindcss6.png",
  "Bun": "https://raw.githubusercontent.com/Aikoyori/ProgrammingVTuberLogos/main/Bun/BunLogo.png",
  "TypeScript": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/TypeScript/TypeScript.png",
  "Supabase": "https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/main/assets/alfon/supabase.svg",
  "Vercel": "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/Vercel/png/Vercel.png",
  "Git": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/GitHub/GitHub.png",
  "Postgres": "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/PostgreSQL/png/PostgreSQL.png",
  "PostgreSQL": "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/PostgreSQL/png/PostgreSQL.png",
  "Python": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Python/Python.png",
  "Figma": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Figma/Figma.png",
  "Docker": "https://raw.githubusercontent.com/Aikoyori/ProgrammingVTuberLogos/main/Docker/DockerLogo.png",
  "GitHub": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/GitHub/GitHub.png"
};

export default function StackPage() {
  const { t } = useLangStore();
  const [items, setItems] = useState<StackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStack() {
      const { data, error } = await supabase
        .from('stack_items')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error("Stack fetch error:", error);
      } else {
        setItems(data || []);
      }
      setLoading(false);
    }
    fetchStack();
  }, []);

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24 min-h-screen">
      <div className="flex flex-col mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tighter text-text-primary">
          {t('stack.title').split(' ')[0]} <span className="text-primary italic">{t('stack.title').split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl font-body">
          {t('stack.subtitle')}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-64 bg-surface/30 rounded-3xl border border-border/50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-surface/20 border border-border/40 p-8 rounded-3xl hover:border-primary/30 transition-all duration-300">
              <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-muted mb-8 pb-4 border-b border-border/20">
                {cat}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {items.filter(i => i.category === cat).map(item => (
                  <div key={item.id} className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 relative flex items-center justify-center bg-surface/40 rounded-2xl border border-border/50 group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300">
                      {(item.logo_url || LOGO_MAPPING[item.name]) ? (
                        <div className="relative w-10 h-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <Image 
                            src={item.logo_url || LOGO_MAPPING[item.name]!} 
                            alt={item.name} 
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono text-text-muted font-bold uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                          {item.name.slice(0, 2)}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-mono font-bold text-text-muted group-hover:text-text-primary transition-colors uppercase tracking-wider text-center">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
