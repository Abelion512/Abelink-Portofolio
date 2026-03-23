import { supabase } from "@/lib/supabase";
import { Laptop, Cpu, Monitor, Terminal, Wrench } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

interface UseItem {
  id: string;
  name: string;
  description: string;
  category: "Hardware" | "Software" | "Workspace";
  url?: string;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const norm = category.toLowerCase();
  switch (norm) {
    case "hardware": return <Cpu size={24} className="text-primary" />;
    case "software": return <Terminal size={24} className="text-accent" />;
    case "workspace": return <Monitor size={24} className="text-text-primary" />;
    default: return <Wrench size={24} />;
  }
};

export default async function UsesPage() {
  const { data: items } = await supabase
    .from("uses_items")
    .select("*")
    .order("category", { ascending: true });

  const groupedItems = items?.reduce((acc: Record<string, UseItem[]>, item: UseItem) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, UseItem[]>) || {};

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <div className="max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Uses
        </h1>
        <p className="text-text-secondary text-lg md:text-xl font-mono leading-relaxed">
          A curated list of the dev tools, hardware ecosystem, and digital utilities I rely on to build things on the internet.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-16">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="glass p-12 text-center rounded-3xl border border-white/10">
            <Laptop size={48} className="mx-auto mb-6 text-text-secondary opacity-50" />
            <p className="font-mono text-text-secondary">No gear data synced yet.</p>
          </div>
        ) : (
          Object.keys(groupedItems).map((category) => (
            <section key={category}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-surface rounded-2xl border border-white/5 shadow-inner">
                  <CategoryIcon category={category} />
                </div>
                <h2 className="text-3xl font-display font-bold text-text-primary capitalize">
                  {category}
                </h2>
              </div>
              
              <div className="grid gap-4">
                {groupedItems[category].map((item: UseItem) => (
                  <div 
                    key={item.id} 
                    className="group glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(108,99,255,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold font-display text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-text-secondary text-sm font-mono leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-surface text-text-primary text-sm font-bold rounded-xl border border-border hover:bg-white/10 hover:border-white/20 transition-all shrink-0 w-fit"
                      >
                        Get it
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
