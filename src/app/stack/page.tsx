import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack | Ihsanuddin Salav",
  description: "The tools, languages, and frameworks used to build digital experiences by Ihsanuddin Salav.",
};

export const revalidate = 3600;

const LOGO_MAPPING: Record<string, string> = {
  "Next.js": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Next.js/Next.js.png",
  "React": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/React/React.png",
  "Tailwind CSS": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Tailwindcss/Tailwindcss6.png",
  "Bun": "https://raw.githubusercontent.com/Aikoyori/ProgrammingVTuberLogos/main/Bun/BunLogo.png",
  "TypeScript": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/TypeScript/TypeScript.png",
  "Supabase": "https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/main/assets/alfon/supabase.svg",
  "Vercel": "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/Vercel/png/Vercel.png",
  "Git": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/GitHub/GitHub.png",
  "Postgres": "https://raw.githubusercontent.com/SAWARATSUKI/KawaiiLogos/main/PostgreSQL/png/PostgreSQL.png",
  "Python": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Python/Python.png",
  "Figma": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/Figma/Figma.png",
  "Docker": "https://raw.githubusercontent.com/Aikoyori/ProgrammingVTuberLogos/main/Docker/DockerLogo.png",
  "GitHub": "https://raw.githubusercontent.com/Ender-Wiggin2019/ServiceLogos/main/GitHub/GitHub.png"
};

const STACK_DATA = [
  {
    category: "Development",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Bun", "Vite"]
  },
  {
    category: "Backend & Cloud",
    items: ["Supabase", "Postgres", "Vercel", "Docker"]
  },
  {
    category: "Tools & Workspace",
    items: ["Git", "GitHub", "Figma", "VS Code"]
  }
];

export default async function StackPage() {
  return (
    <main className="pt-32 px-6 max-w-6xl mx-auto mb-24">
      <div className="flex flex-col mb-16">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 tracking-tighter">
          Tech <span className="text-primary italic">Stack</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl font-body">
          A curated collection of tools and frameworks I use to bring digital products to life. Focus on performance, scalability, and modern DX.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STACK_DATA.map((section, idx) => (
          <div key={idx} className="bg-[#0a0a0c] border border-neutral-800/80 p-8 rounded-3xl hover:border-neutral-700 transition-all duration-300">
            <h2 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-neutral-500 mb-8 pb-4 border-b border-neutral-800/50">
              {section.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {section.items.map(item => (
                <div key={item} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 relative flex items-center justify-center bg-neutral-900/50 rounded-2xl border border-neutral-800/50 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                    {LOGO_MAPPING[item] ? (
                      <img 
                        src={LOGO_MAPPING[item]} 
                        alt={item} 
                        className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                      />
                    ) : (
                      <div className="text-[10px] font-mono text-neutral-600 font-bold uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                        {item.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 group-hover:text-neutral-200 transition-colors uppercase tracking-wider text-center">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
