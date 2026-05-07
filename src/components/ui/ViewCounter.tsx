"use client";

import { supabase } from "@/lib/supabase";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ViewCounter({ slug, table = "projects" }: { slug: string, table?: string }) {
  const { data: views, isError } = useQuery({
    queryKey: ["views", table, slug],
    queryFn: async () => {
      // Use Supabase RPC for atomic increment (SR-04)
      const { data, error } = await supabase.rpc("increment_view", { 
        page_slug: slug 
      });
      
      if (error) {
        console.error("Error incrementing views:", error);
        // Fallback: Fetch current if RPC fails
        const { data: fetchResult } = await supabase
          .from(table)
          .select("views")
          .eq("id", slug)
          .single();
        return fetchResult?.views ?? 0;
      }

      return data as number;
    },
    // Don't refetch on window focus to avoid spamming the RPC
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
  });

  if (views === undefined || isError) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs font-mono text-text-secondary bg-surface/50 px-2 py-1 rounded-md border border-white/5 w-fit">
      <Eye size={12} className="text-primary" />
      <span>{views.toLocaleString()}</span>
    </div>
  );
}
