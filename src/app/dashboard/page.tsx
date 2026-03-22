"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { LayoutGrid, Trophy, Settings, Plus, Edit2, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Tab = "projects" | "achievements";

interface DashboardItem {
  id: string;
  title?: string;
  name?: string;
  status?: string;
  date?: string;
  created_at?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [data, setData] = useState<DashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (tab: Tab) => {
    setIsLoading(true);
    const { data: result, error } = await supabase
      .from(tab)
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && result) {
      setData(result as DashboardItem[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData(activeTab);
  }, [activeTab]);

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2">
        <h2 className="font-display font-bold text-2xl mb-6">Overview</h2>
        
        <button
          onClick={() => setActiveTab("projects")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === "projects" 
              ? "bg-primary text-white" 
              : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
          }`}
        >
          <LayoutGrid size={18} /> Projects
        </button>
        
        <button
          onClick={() => setActiveTab("achievements")}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
            activeTab === "achievements" 
              ? "bg-primary text-white" 
              : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
          }`}
        >
          <Trophy size={18} /> Achievements
        </button>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all mt-4"
        >
          <Settings size={18} /> Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="glass rounded-3xl border border-white/10 p-6 md:p-8 min-h-[600px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold capitalize">{activeTab}</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all">
              <Plus size={16} /> Add New
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-20 text-text-secondary font-mono text-sm">
              No {activeTab} found in database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-sm font-mono text-text-secondary">
                    <th className="pb-4 font-normal">Title</th>
                    <th className="pb-4 font-normal hidden md:table-cell">Date</th>
                    <th className="pb-4 font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={item.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                    >
                      <td className="py-4 font-medium text-text-primary">
                        {item.title ?? item.name}
                        {item.status && (
                          <span className="ml-3 text-[10px] px-2 py-1 bg-surface rounded-md text-text-secondary font-mono uppercase">
                            {item.status}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-sm text-text-secondary hidden md:table-cell">
                        {item.date ?? (item.created_at ? new Date(item.created_at).toLocaleDateString() : '-')}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-surface hover:bg-white/10 text-text-secondary hover:text-primary rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2 bg-surface hover:bg-red-500/20 text-text-secondary hover:text-red-400 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
