"use client";

import React, { useEffect, useState } from 'react';
import TikTokCard from '@/components/ui/TikTokCard';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface CreationItem {
  id: string;
  title: string;
  embed_url: string;
  category: string;
  cover_image: string;
}

export default function CreationPage() {
  const [items, setItems] = useState<CreationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchCreation() {
      try {
        const { data, error } = await supabase
          .from('creation')
          .select('*')
          .eq('is_visible', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching creation:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCreation();

    // Realtime Subscription
    const channel = supabase
      .channel('creation_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'creation' },
        (payload: RealtimePostgresChangesPayload<CreationItem>) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as CreationItem;
            setItems((prev) => [newItem, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedItem = payload.new as CreationItem;
            setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
          } else if (payload.eventType === 'DELETE') {
            setItems((prev) => prev.filter((item) => item.id === payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const categories = ["all", ...Array.from(new Set(items.map(i => i.category)))];
  const filteredItems = filter === "all" ? items : items.filter(i => i.category === filter);

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
          Kumpulan inspirasi, tutorial, dan momen menarik yang saya temukan di TikTok. 
          Semuanya dikurasi langsung dari saku saya.
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
            Array.from({ length: 6 }).map((_, i) => <CreationSkeleton key={i} />)
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col bg-[#0a0a0c] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="rounded-[1.5rem] overflow-hidden bg-neutral-900 border border-white/5 ring-1 ring-white/10 group-hover:ring-primary/20 transition-all">
                    <TikTokCard url={item.embed_url} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-neutral-500 font-mono text-sm uppercase tracking-[0.2em]">Belum ada konten yang tersedia</p>
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
      <div className="w-full aspect-[9/16] bg-white/5 rounded-[1.5rem]" />
    </div>
  );
}
