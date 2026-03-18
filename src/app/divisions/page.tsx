import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divisions | OlivX",
  description: "Explore the four core divisions of OlivX: AI, Automation, Fullstack, and Finance.",
};

const divisions = [
  { name: "AI Division", items: ["Abelink AI", "Cybill Assistant", "reLink AI"], icon: "🤖" },
  { name: "Automation", items: ["n8n Workflows", "Self-hosted AI OS"], icon: "⚙️" },
  { name: "Fullstack Web", items: ["Next.js Apps", "Supabase Integration"], icon: "🌐" },
  { name: "Finance", items: ["Autonomous Trading", "Market Analysis Tools"], icon: "📈" },
];

export default function DivisionsPage() {
  return (
    <main className="pt-32 px-6 max-w-5xl mx-auto mb-20">
      <h1 className="text-5xl font-display font-bold mb-12 italic">OlivX <span className="text-gradient">Divisions</span></h1>
      
      <div className="grid sm:grid-cols-2 gap-8">
        {divisions.map((div, i) => (
          <div key={i} className="p-8 rounded-3xl glass border border-border bg-surface/20 group hover:bg-surface/40 transition-all duration-500">
            <div className="text-4xl mb-6">{div.icon}</div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-ai-teal transition-colors">{div.name}</h3>
            <ul className="space-y-2">
              {div.items.map((item, j) => (
                <li key={j} className="text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-olivx-purple/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
