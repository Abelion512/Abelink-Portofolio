"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye } from "lucide-react";

export default function ViewCounter({ slug, table = "projects" }: { slug: string, table?: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      // 1. Fetch current views
      const { data, error } = await supabase
        .from(table)
        .select("views")
        .eq("slug", slug)
        .single();
      
      if (error || !data) {
        console.error("Error fetching views:", error);
        return;
      }

      const currentViews = data.views || 0;
      setViews(currentViews + 1);

      // 2. Increment view count (in a real app, use an RPC for atomicity)
      // This is a simple optimistic update for demonstration
      await supabase
        .from(table)
        .update({ views: currentViews + 1 })
        .eq("slug", slug);
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
