"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye } from "lucide-react";

export default function ViewCounter({ slug, table = "projects" }: { slug: string, table?: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      // Use Supabase RPC for atomic increment (SR-04)
      const { data, error } = await supabase.rpc("increment_view", { 
        page_slug: slug 
      });
      
      if (error) {
        console.error("Error incrementing views:", error);
        // Fallback: Fetch current if RPC fails (might happen if not seeded yet)
        const { data: fetchResult } = await supabase
          .from(table)
          .select("views")
          .eq("id", slug)
          .single();
        if (fetchResult) setViews(fetchResult.views);
        return;
      }

      setViews(data);
    };

    fetchAndIncrementViews();
  }, [slug, table]);

  if (views === null) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary bg-surface/50 px-2 py-1 rounded-md border border-white/5 w-fit">
      <Eye size={12} className="text-primary" />
      <span>{views.toLocaleString()}</span>
    </div>
  );
}
