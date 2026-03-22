import { Metadata } from "next";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Tech Stack | Ihsanuddin Salav",
  description: "The tools, languages, and frameworks used to build digital experiences by Ihsanuddin Salav.",
};

export const revalidate = 3600;

export default async function StackPage() {
  const { data, error } = await supabase
    .from('stack_items')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true });

  let stackData: { category: string; items: string[] }[] = [];

  if (data && !error) {
    const categories = Array.from(new Set(data.map(item => item.category)));
    stackData = categories.map(cat => ({
      category: cat,
      items: data.filter(i => i.category === cat).map(i => i.name)
    }));
  }

  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-24">
      <h1 className="text-5xl font-display font-bold mb-4 italic">Tech <span className="text-gradient">Stack</span></h1>
      <p className="text-text-secondary text-lg mb-12 max-w-2xl">
        A comprehensive look at the technologies, languages, and tools I use to build scalable web applications and AI infrastructure.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {stackData.map((section, idx) => (
          <div key={idx} className="glass border border-border bg-surface/30 p-8 rounded-[2rem] hover:border-olivx-purple/30 transition-all duration-300 group">
            <h2 className="text-xl font-display font-bold mb-6 text-text-primary group-hover:text-gradient transition-all">{section.category}</h2>
            <div className="flex flex-wrap gap-3">
              {section.items.map(item => (
                <span key={item} className="px-3 py-1.5 bg-base/80 backdrop-blur-md border border-border/50 text-sm font-mono text-text-secondary rounded-lg hover:text-ai-teal hover:border-ai-teal/30 hover:-translate-y-1 transition-all cursor-default shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
