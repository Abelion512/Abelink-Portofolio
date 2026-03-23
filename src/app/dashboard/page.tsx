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
  ExternalLink
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLangStore } from "@/store/languageStore";

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
  url?: string;
}

export default function Dashboard() {
  const [settings, setSettings] = useState<Setting | null>(null);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  useLangStore();

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      
      // 1. Fetch Settings
      const { data: setts } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (setts) setSettings(setts);

      // 2. Fetch Recent Activities
      const [{ data: projects }, { data: achievements }] = await Promise.all([
        supabase.from('projects').select('id, name, description, created_at, url').order('created_at', { ascending: false }).limit(3),
        supabase.from('achievements').select('id, title, issuer, created_at, credential_url').order('created_at', { ascending: false }).limit(3)
      ]);

      const combinedFeed: FeedItem[] = [];
      
      if (projects) {
        projects.forEach(p => {
          combinedFeed.push({
            id: p.id,
            type: "project",
            title: p.name,
            description: p.description,
            date: p.created_at,
            url: p.url
          });
        });
      }

      if (achievements) {
        achievements.forEach(a => {
          combinedFeed.push({
            id: a.id,
            type: "achievement",
            title: a.title,
            description: a.issuer,
            date: a.created_at,
            url: a.credential_url
          });
        });
      }

      // Sort combined feed by date
      combinedFeed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFeed(combinedFeed);
      setLoading(false);
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="font-mono text-xs text-text-secondary animate-pulse uppercase tracking-widest">
            Syncing System...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
            <Activity size={14} />
            System Live Feed
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-text-primary">
            Abelink <span className="text-gradient">Pulse</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 glass rounded-2xl border border-white/5 bg-surface/30">
          <div className="flex -space-x-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-base bg-gradient-to-br from-primary/40 to-accent/40" />
            ))}
          </div>
          <span className="text-xs font-mono text-text-secondary">
            <span className="text-text-primary font-bold">128+</span> nodes active
          </span>
        </div>
      </header>

      {/* 2. Status Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Availability */}
        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Circle size={80} className="text-accent" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">Availability</p>
            <h3 className="text-2xl font-display font-bold text-text-primary flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${settings?.open_to_work ? 'bg-accent animate-pulse' : 'bg-red-500'}`} />
              {settings?.open_to_work ? 'Open to Work' : 'Busy / Built'}
            </h3>
          </div>
        </div>

        {/* Development */}
        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Terminal size={80} className="text-primary" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">Building</p>
            <h3 className="text-xl font-display font-bold text-text-primary truncate">
              {settings?.currently_building || "Project X"}
            </h3>
          </div>
        </div>

        {/* Now Playing */}
        <div className="glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Music size={80} className="text-[#1DB954]" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-2">Now Playing</p>
            <h3 className="text-xl font-display font-bold text-text-primary truncate flex items-center gap-3">
              <Music size={18} className="text-[#1DB954] shrink-0" />
              {settings?.now_playing || "Silent Mode"}
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
            <h2 className="text-2xl font-display font-bold text-text-primary">Recent Activity</h2>
          </div>
          
          <div className="space-y-4">
            {feed.length === 0 ? (
              <div className="glass p-12 text-center rounded-3xl border border-white/5 italic text-text-secondary">
                No activity detected in the last few cycles.
              </div>
            ) : (
              feed.map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={item.id} 
                  className="glass p-6 rounded-3xl border border-white/5 flex items-start gap-4 hover:border-primary/20 transition-colors group"
                >
                  <div className="mt-1 p-3 bg-surface rounded-2xl text-primary border border-white/5">
                    {item.type === 'project' ? <Code2 size={24} /> : <Trophy size={24} />}
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
                        View Details <ExternalLink size={12} />
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
          <div className="glass p-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="flex items-center gap-3 text-primary mb-6">
              <Sparkles size={20} />
              <h3 className="text-xl font-display font-bold">System Insights</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary mb-2">Curriculum</p>
                <div className="p-4 bg-surface/50 rounded-2xl border border-white/5">
                  <p className="text-sm text-text-primary font-medium leading-relaxed">
                    Currently deep diving into <span className="text-accent font-bold">{settings?.currently_learning}</span>.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                <p className="text-xs text-text-primary font-body leading-relaxed">
                  The dashboard is automatically synchronized with the Supabase core. 
                  All information here represents the latest state of the system in near real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
