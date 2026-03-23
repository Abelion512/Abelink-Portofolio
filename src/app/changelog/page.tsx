"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, RefreshCcw, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useLangStore } from "@/store/languageStore";

interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  description: string;
  type: string;
  created_at: string;
}

export default function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useLangStore();

  useEffect(() => {
    async function fetchChangelog() {
      const { data, error } = await supabase
        .from('changelog_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setEntries(data);
      }
      setLoading(false);
    }
    fetchChangelog();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-mono uppercase tracking-widest">{t('common.back')}</span>
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-3 text-primary font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <RefreshCcw size={14} className="animate-spin-slow" />
            Evolution Log
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-text-primary mb-8">
            System <span className="text-gradient">Changelog</span>
          </h1>
          <p className="text-text-secondary text-lg font-body leading-relaxed max-w-2xl">
            Tracking the architectural iterations and feature expansions of the Abelink ecosystem.
          </p>
        </header>

        {loading ? (
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-surface/30 rounded-[2.5rem] border border-border/20" />
            ))}
          </div>
        ) : (
          <div className="relative border-l border-border/20 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
            <AnimatePresence>
              {entries.map((entry, idx) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[calc(2rem_+_1px)] md:-left-[calc(3rem_+_1px)] top-2 w-4 h-4 rounded-full bg-base border-2 border-primary shadow-[0_0_10px_rgba(108,99,255,0.5)] z-10" />
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[10px] font-mono font-bold tracking-tighter uppercase">
                        v{entry.version || '1.0.0'}
                      </span>
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                        <Clock size={12} /> {formatDate(entry.created_at)}
                      </span>
                      {entry.type && (
                        <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent uppercase tracking-widest opacity-60">
                           <Terminal size={12} /> {entry.type}
                        </span>
                      )}
                    </div>
                    
                    <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-surface/30 relative group hover:border-primary/20 transition-all">
                      <h3 className="text-2xl font-display font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                        {entry.title}
                      </h3>
                      <div className="prose prose-invert prose-sm max-w-none text-text-secondary font-body leading-relaxed">
                        {entry.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {entries.length === 0 && !loading && (
          <div className="text-center py-20 glass rounded-[2.5rem] border border-dashed border-border/40">
            <p className="italic text-text-muted">No entries found. The system is stable.</p>
          </div>
        )}
      </div>
    </main>
  );
}
