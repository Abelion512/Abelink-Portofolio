"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Activity,
  Code2,
  Sparkles,
  Trophy,
  Clock,
  Music,
  Terminal,
  Circle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { env } from "@/lib/env";
import { useLangStore } from "@/store/languageStore";
import { usePerformance } from "@/hooks/usePerformance";
import { PageSkeleton } from "@/components/ui/Skeleton";

interface Setting {
  open_to_work: boolean;
  currently_learning: string;
  currently_building: string;
  now_playing: string | null;
}

interface FeedItem {
  id: string;
  type: "project" | "achievement" | "learning";
  title: string;
  description?: string;
  date: string;
  timestamp: number;
  url?: string;
}

export default function Dashboard() {
  const { t } = useLangStore();
  const [settings, setSettings] = useState<Setting | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { lowPowerMode } = usePerformance();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data: setts, error: settingsError } = await supabase
          .from("settings")
          .select("*")
          .eq("id", env.SETTINGS_ROW_ID)
          .single();

        if (settingsError) throw settingsError;
        if (setts) setSettings(setts);

        const [{ data: projects }, { data: achievements }] = await Promise.all([
          supabase
            .from("projects")
            .select("id, name, description, created_at, url")
            .order("created_at", { ascending: false })
            .limit(3),
          supabase
            .from("achievements")
            .select("id, title, issuer, created_at, credential_url")
            .order("created_at", { ascending: false })
            .limit(3),
        ]);

        const combinedFeed: FeedItem[] = [];

        if (projects) {
          projects.forEach((p) => {
            combinedFeed.push({
              id: p.id,
              type: "project",
              title: p.name,
              description: p.description,
              date: p.created_at,
              timestamp: new Date(p.created_at).getTime(),
              url: p.url,
            });
          });
        }

        if (achievements) {
          achievements.forEach((a) => {
            combinedFeed.push({
              id: a.id,
              type: "achievement",
              title: a.title,
              description: a.issuer,
              date: a.created_at,
              timestamp: new Date(a.created_at).getTime(),
              url: a.credential_url,
            });
          });
        }

        combinedFeed.sort((a, b) => b.timestamp - a.timestamp);
        setFeed(combinedFeed);
        setError(null);
      } catch (err) {
        console.warn("Dashboard fetch failed:", err);
        setError("Could not sync dashboard data. Displaying cached state.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="space-y-12 pb-20">
      {error && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Activity size={14} />
            {t("dashboard.live") || "System Live Feed"}
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-text-primary">
            {t("dashboard.title") || "Abelink"}{" "}
            <span className="text-gradient">{t("dashboard.pulse") || "Pulse"}</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 glass rounded-2xl border border-white/5 bg-surface/30">
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-base bg-linear-to-br from-primary/40 to-accent/40"
              />
            ))}
          </div>
          <span className="text-xs font-mono text-text-secondary">
            <span className={`font-bold ${settings ? "text-accent" : "text-text-muted"}`}>
              {settings ? "Live" : "—"}
            </span>{" "}
            {t("dashboard.nodes") || "nodes active"}
          </span>
        </div>
      </header>

      {/* 2. Analytics & Status Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Visitors Traffic */}
        <div
          className={`p-8 rounded-4xl border border-white/5 relative overflow-hidden group bg-linear-to-br from-primary/5 via-transparent to-transparent ${
            lowPowerMode ? "bg-surface/90" : "glass"
          }`}
        >
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-1">
                  {t("dashboard.traffic") || "Traffic Overview"}
                </p>
                <h3 className="text-3xl font-display font-bold text-text-secondary/40">
                  ⏳
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-xl">
                <Activity size={18} className="text-primary" />
              </div>
            </div>
            <div className="mt-auto pt-4">
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                {t("dashboard.coming_soon") || "Analytics dashboard — coming soon"}
              </p>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div
          className={`p-8 rounded-4xl border border-white/5 relative overflow-hidden group ${
            lowPowerMode ? "bg-surface/90" : "glass"
          }`}
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Circle size={80} className="text-accent" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">
              {t("dashboard.availability") || "Availability"}
            </p>
            <h3 className="text-2xl font-display font-bold text-text-primary flex items-center gap-3">
              <span
                className={`w-3 h-3 rounded-full ${settings?.open_to_work ? "bg-accent animate-pulse" : "bg-red-500"}`}
              />
              {settings?.open_to_work
                ? t("dashboard.open") || "Open to Work"
                : t("dashboard.busy") || "Busy / Built"}
            </h3>
          </div>
        </div>

        {/* Current Focus */}
        <div
          className={`p-8 rounded-4xl border border-white/5 relative overflow-hidden group ${
            lowPowerMode ? "bg-surface/90" : "glass"
          }`}
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Terminal size={80} className="text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">
              {t("dashboard.building") || "Building"}
            </p>
            <h3 className="text-xl font-display font-bold text-text-primary truncate flex items-center gap-2">
              {settings?.currently_building || (
                <span className="text-text-muted text-sm font-mono uppercase tracking-wider">
                  {t("dashboard.none") || "No active project"}
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* Now Playing */}
        <div
          className={`p-8 rounded-4xl border border-white/5 relative overflow-hidden group ${
            lowPowerMode ? "bg-surface/90" : "glass"
          }`}
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Music size={80} className="text-[#1DB954]" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">
              {t("dashboard.nowplaying") || "Now Playing"}
            </p>
            <h3 className="text-xl font-display font-bold text-text-primary truncate flex items-center gap-3">
              <Music size={18} className="text-[#1DB954] shrink-0" />
              {settings?.now_playing || (
                <span className="text-text-muted text-sm font-mono uppercase tracking-wider">
                  {t("dashboard.paused") || "Paused"}
                </span>
              )}
            </h3>
          </div>
        </div>
      </div>

      {/* 3. Main Feed Section */}
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <Clock size={16} className="text-primary" />
            <h2 className="text-2xl font-display font-bold text-text-primary">
              {t("dashboard.activity") || "Recent Activity"}
            </h2>
          </div>

          <div className="space-y-4">
            {feed.length === 0 ? (
              <div className="glass p-16 text-center rounded-3xl border border-white/5">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-surface/40 border border-white/5 flex items-center justify-center">
                  <Clock size={24} className="text-text-muted" />
                </div>
                <h3 className="text-lg font-display font-bold text-text-primary mb-2">
                  {t("dashboard.no_activity") || "No activity yet"}
                </h3>
                <p className="text-sm text-text-muted font-mono uppercase tracking-wider">
                  {t("dashboard.no_activity_desc") || "Feed updates when projects or achievements are added"}
                </p>
              </div>
            ) : (
              feed.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id}
                  className={`p-6 rounded-3xl border border-white/5 flex items-start gap-4 hover:border-primary/20 transition-colors group ${
                    lowPowerMode ? "bg-surface/90" : "glass"
                  }`}
                >
                  <div className="mt-1 p-3 bg-surface rounded-2xl text-primary border border-white/5">
                    {item.type === "project" ? (
                      <Code2 size={24} />
                    ) : (
                      <Trophy size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-text-secondary uppercase">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-primary hover:text-primary transition-colors"
                      >
                        {t("dashboard.view") || "View Details"}{" "}
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right: Insights */}
        <div className="lg:col-span-2 space-y-8">
          <div
            className={`p-8 rounded-4xl border border-white/10 bg-linear-to-br from-primary/5 to-accent/5 ${
              lowPowerMode ? "bg-surface/95" : "glass"
            }`}
          >
            <div className="flex items-center gap-3 text-primary mb-6">
              <Sparkles size={20} />
              <h3 className="text-xl font-display font-bold">
                {t("dashboard.insights") || "System Insights"}
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary mb-2">
                  {t("dashboard.curriculum") || "Curriculum"}
                </p>
                <div className="p-4 bg-surface/50 rounded-2xl border border-white/5">
                  <p className="text-sm text-text-primary font-medium leading-relaxed">
                    {t("dashboard.learning_prefix") || "Currently deep diving into"}{" "}
                    <span className="text-accent font-bold">
                      {settings?.currently_learning || "—"}
                    </span>.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                <p className="text-xs text-text-primary font-body leading-relaxed">
                  {t("dashboard.sync_note") ||
                    "The dashboard is automatically synchronized with the Supabase core. All information here represents the latest state of the system in near real-time."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
