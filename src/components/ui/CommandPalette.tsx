"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Github, Mail } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import { NAV_ITEMS } from "@/constants/nav";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { lang, setLang, t } = useLangStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] bg-base/60 backdrop-blur-sm px-4">
      <div className="fixed inset-0" onClick={() => setOpen(false)} />
      
      <Command 
        className="relative w-full max-w-xl bg-surface/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-overlay overflow-hidden will-change-transform"
        label="Global Command Menu"
      >
        <div className="flex items-center gap-3 px-4 border-b border-border/50">
          <Search size={18} className="text-primary" />
          <Command.Input 
            autoFocus
            placeholder={t('common.search') || 'Search everything...'} 
            className="w-full bg-transparent p-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 font-body text-lg"
          />
        </div>

        <Command.List className="max-h-[350px] overflow-y-auto p-2 no-scrollbar scroll-smooth">
          <Command.Empty className="p-8 text-center text-text-secondary text-sm font-mono">
            {lang === 'id' ? 'Tidak ada hasil ditemukan.' : 'No results found.'}
          </Command.Empty>

          <Command.Group heading="Navigation" className="px-3 py-2 text-[10px] font-mono text-primary uppercase tracking-widest">
            {NAV_ITEMS.map((item) => (
              <Command.Item 
                key={item.href}
                onSelect={() => runCommand(() => router.push(item.href))}
                className="flex items-center gap-3 p-3 mt-1 rounded-xl text-text-primary text-sm hover:cursor-pointer hover:bg-white/5 aria-selected:bg-primary aria-selected:text-white transition-[background-color,color] duration-200 will-change-[background-color,color]"
              >
                <item.icon size={16} /> {t(item.label)}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions" className="px-3 py-2 mt-2 text-[10px] font-mono text-accent uppercase tracking-widest border-t border-border/50">
            <Command.Item 
              onSelect={() => runCommand(() => setLang(lang === 'en' ? 'id' : 'en'))}
              className="flex items-center gap-3 p-3 mt-1 rounded-xl text-text-primary text-sm hover:cursor-pointer hover:bg-white/5 aria-selected:bg-primary aria-selected:text-white transition-[background-color,color] duration-200"
            >
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold">
                {lang.toUpperCase()}
              </div>
              {lang === 'id' ? 'Ubah ke Bahasa Inggris (Switch to EN)' : 'Ubah ke Bahasa Indonesia (Switch to ID)'}
            </Command.Item>
            
            <Command.Item 
              onSelect={() => runCommand(() => window.open('https://github.com/Abelion512', '_blank'))}
              className="flex items-center gap-3 p-3 mt-1 rounded-xl text-text-primary text-sm hover:cursor-pointer hover:bg-white/5 aria-selected:bg-primary aria-selected:text-white transition-all"
            >
              <Github size={16} /> GitHub Profile
            </Command.Item>
            
            <Command.Item 
              onSelect={() => runCommand(() => window.open('mailto:agen.salva@gmail.com', '_blank'))}
              className="flex items-center gap-3 p-3 mt-1 rounded-xl text-text-primary text-sm hover:cursor-pointer hover:bg-white/5 aria-selected:bg-primary aria-selected:text-white transition-all"
            >
              <Mail size={16} /> {t('nav.contact')}
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="px-4 py-3 border-t border-border/50 flex gap-6 text-[12px] font-mono text-text-primary uppercase tracking-widest bg-surface/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
          <span className="flex items-center gap-2.5"><kbd className="bg-primary/20 px-2 py-0.5 rounded-md border border-primary/40 text-primary shadow-sm min-w-[22px] text-center font-sans tracking-normal font-bold">↵</kbd> select</span>
          <span className="flex items-center gap-2.5"><kbd className="bg-primary/20 px-2 py-0.5 rounded-md border border-primary/40 text-primary shadow-sm min-w-[22px] text-center font-sans tracking-normal font-bold">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-2.5"><kbd className="bg-primary/20 px-2 py-0.5 rounded-md border border-primary/40 text-primary shadow-sm min-w-[22px] text-center font-sans tracking-normal font-bold">esc</kbd> close</span>
        </div>
      </Command>
    </div>
  );
}
