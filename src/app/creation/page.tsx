"use client";

import { useEffect, useState } from "react";
import MediaCard from "@/components/ui/MediaCard";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "motion/react";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface CreationItem {
  id: string;
  title: string;
  embed_url: string;
  category: string;
  cover_image: string;
  view_count?: number;
  like_count?: number;
}

export default function CreationPage() {
  const [items, setItems] = useState<CreationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchCreation() {
      try {
        const { data, error } = await supabase
          .from("creation")
          .select("*")
          .eq("is_visible", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error("Error fetching creation:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCreation();

    // Realtime Subscription
    const channel = supabase
      .channel("creation_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "creation" },
        (payload: RealtimePostgresChangesPayload<CreationItem>) => {
          if (payload.eventType === "INSERT") {
            const newItem = payload.new as CreationItem;
            setItems((prev) => [newItem, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            const updatedItem = payload.new as CreationItem;
            setItems((prev) =>
              prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setItems((prev) =>
              prev.filter((item) => item.id === payload.old.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = ["all", ...new Set(items.map((i) => i.category))];
  const filteredItems =
    filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-syne mb-6 text-white tracking-tight">
          Favorite <span className="text-primary">Creation</span>
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Kumpulan inspirasi, tutorial, dan momen menarik yang saya temukan di
          TikTok. Semuanya dikurasi langsung dari saku saya.
        </p>
      </motion.div>

      {/* Filter Chips */}
      {!loading && items.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all border ${
                filter === cat
                  ? "bg-primary text-white border-primary shadow-xl shadow-primary/20"
                  : "bg-white/5 text-neutral-500 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <CreationSkeleton key={i} />
            ))
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <MediaCard
                  title={item.title}
                  category={item.category}
                  coverImage={item.cover_image}
                  url={item.embed_url}
                  views={item.view_count}
                  likes={item.like_count}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface/40 border border-white/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-bold text-text-primary mb-2">No content yet</h3>
              <p className="text-text-muted text-sm font-mono uppercase tracking-[0.2em]">
                Creation gallery coming soon
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function CreationSkeleton() {
  return (
    <div className="w-full bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] p-8 animate-pulse">
      <div className="w-20 h-5 bg-white/5 rounded-full mb-4" />
      <div className="w-full h-8 bg-white/5 rounded-lg mb-6" />
      <div className="w-full aspect-9/16 bg-white/5 rounded-3xl" />
    </div>
  );
}
