"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";
import { GitCommit, GitPullRequest, Bug, Sparkles, ArrowUpRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  content: string | null;
  date: string;
  type: "major" | "minor" | "patch" | "fix";
}

const typeConfig = {
  major: {
    icon: Sparkles,
    label: "Major",
    color: "text-primary",
    border: "border-primary/30",
    dot: "bg-primary",
    line: "from-primary/40 via-primary/10",
    glow: "shadow-primary/20",
  },
  minor: {
    icon: GitCommit,
    label: "Minor",
    color: "text-accent",
    border: "border-accent/30",
    dot: "bg-accent",
    line: "from-accent/40 via-accent/10",
    glow: "shadow-accent/20",
  },
  patch: {
    icon: GitPullRequest,
    label: "Patch",
    color: "text-emerald-400",
    border: "border-emerald-400/30",
    dot: "bg-emerald-400",
    line: "from-emerald-400/40 via-emerald-400/10",
    glow: "shadow-emerald-400/20",
  },
  fix: {
    icon: Bug,
    label: "Fix",
    color: "text-amber-400",
    border: "border-amber-400/30",
    dot: "bg-amber-400",
    line: "from-amber-400/40 via-amber-400/10",
    glow: "shadow-amber-400/20",
  },
};

function semverSort(a: string, b: string): number {
  const pa = a.replace(/^v/, "").split(".").map(Number);
  const pb = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pb[i] || 0) - (pa[i] || 0);
  }
  return 0;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const { data, error } = await supabase
          .from("changelog_entries")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;
        const list = (data as ChangelogEntry[]) || [];
        list.sort((a, b) => semverSort(a.version, b.version));
        setEntries(list);
      } catch (err) {
        console.error("Failed to fetch changelog:", err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return (
    <main className="pt-32 px-6 max-w-4xl mx-auto mb-32 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 bg-surface/30 text-[10px] font-mono tracking-widest uppercase text-primary mb-5">
          <Sparkles size={14} />
          Release History
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
          <span className="text-gradient">Changelog</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Setiap pembaruan, peningkatan, dan perbaikan pada portofolio ini.
        </p>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && entries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-32"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface/40 border border-white/5 flex items-center justify-center">
            <GitCommit size={32} className="text-text-muted" />
          </div>
          <h3 className="text-xl font-display font-bold text-text-primary mb-2">
            No entries yet
          </h3>
          <p className="text-sm text-text-muted font-mono uppercase tracking-wider">
            Changelog will populate as updates are released
          </p>
        </motion.div>
      )}

      {/* Timeline */}
      {!loading && entries.length > 0 && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] md:left-[31px] top-8 bottom-8 w-[2px] bg-linear-to-b from-primary/30 via-primary/5 to-transparent" />

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
            {entries.map((entry) => {
              const cfg = typeConfig[entry.type] || typeConfig.minor;
              const Icon = cfg.icon;

              return (
                <motion.div key={entry.id} variants={itemAnim} className="relative pl-16 md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-[18px] md:left-[22px] top-7 z-10">
                    <div className={`w-[18px] h-[18px] rounded-full border-[3px] ${cfg.border} ${cfg.dot} ring-[5px] ring-[--color-base] shadow-lg ${cfg.glow}`} />
                  </div>

                  {/* Version badge floating above card */}
                  <div className="flex items-center gap-3 mb-3 pl-1">
                    <div className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest ${cfg.color} ${cfg.border} border bg-surface/50 backdrop-blur-sm`}>
                      <Icon size={10} className="inline -mt-0.5 mr-1" />
                      {cfg.label}
                    </div>
                    <span className="text-[11px] font-mono tracking-tight text-text-muted">
                      v{entry.version.replace(/^v/, "")}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted/50 ml-auto">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`relative overflow-hidden rounded-[2rem] bg-surface/10 border ${cfg.border} transition-all duration-500 hover:bg-surface/20 hover:border-white/20 ${cfg.glow} shadow-lg`}>
                    {/* Subtle top accent line */}
                    <div className={`h-[3px] w-full ${cfg.dot} opacity-60`} />

                    <div className="p-6 md:p-8">
                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-4 flex items-start gap-2">
                        {entry.title}
                        <ArrowUpRight size={16} className="shrink-0 mt-1 text-text-muted/30 group-hover/card:opacity-100 transition-opacity" />
                      </h2>

                      {/* Content */}
                      {entry.content && (
                        <div className="text-text-secondary text-sm leading-relaxed font-body prose prose-invert max-w-none prose-p:leading-relaxed prose-ul:mt-2 prose-li:marker:text-primary/40 [&_ul]:list-disc [&_ul]:pl-4">
                          <ReactMarkdown>
                            {entry.content
                              .replace(/\\n/g, '\n')
                              .replace(/^([^\n]*)\n(?=\s*- )/m, '$1\n\n')}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
    </main>
  );
}
