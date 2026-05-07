"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { Search, Github, Mail, X, ChevronLeft } from "lucide-react";
import { useLangStore } from "@/store/languageStore";
import { useCommandStore } from "@/store/useCommandStore";
import { NAV_ITEMS } from "@/constants/nav";
import { AnimatePresence, motion } from "motion/react";

export default function CommandPalette() {
  const { isOpen, setIsOpen, toggle } = useCommandStore();
  const { t } = useLangStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  if (!mounted) return null;

  const runCommand = (command: () => void) => {
    setIsOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Command.Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
          label="Global Command Menu"
          container={mounted ? document.body : undefined}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
        >
          {/* Backdrop Overlay with Click-to-Close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md pointer-events-auto" 
            onClick={() => setIsOpen(false)} 
          />

          {/* A11y Headers (Radix Accessibility Requirement) */}
          <div className="sr-only">
            <h2 id="command-menu-title">Command Menu</h2>
            <p id="command-menu-description">Search and navigate through the portfolio</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-xl glass-liquid rounded-[28px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden border-white/10 pointer-events-auto font-inter"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex items-center px-6 py-2 border-b border-white/5">
              <Search className="w-5 h-5 text-text-secondary/60 mr-3" />
              <Command.Input
                placeholder={t("search.placeholder") || "Search everything..."}
                className="w-full h-14 bg-transparent outline-none text-text-primary text-base placeholder:text-text-secondary/40"
              />
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-text-secondary opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-all active-haptic"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <Command.List 
              className="max-h-[60vh] overflow-y-auto p-3 transition-all scroll-smooth"
              onScroll={() => {
                if (document.activeElement instanceof HTMLElement && document.activeElement.tagName === 'INPUT') {
                  document.activeElement.blur();
                }
              }}
            >
              <Command.Empty className="py-12 text-center text-text-secondary text-sm">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="opacity-20" />
                </div>
                {t("common.noResults") || "No results found."}
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-3 py-3 text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">
                {NAV_ITEMS.map((item) => (
                  <Command.Item 
                    key={item.href}
                    onSelect={() => runCommand(() => router.push(item.href))}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-default select-none text-[13px] font-medium text-text-secondary data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:shadow-lg data-[selected=true]:shadow-primary/20 transition-all group active-haptic"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-data-[selected=true]:bg-white/20">
                      {item.icon && <item.icon size={16} className="text-text-secondary group-data-[selected=true]:text-white translate-y-[-0.5px]" />}
                    </div>
                    <span className="grow">{t(item.label)}</span>
                    <ChevronLeft size={14} className="opacity-0 group-data-[selected=true]:opacity-40 rotate-180" />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group heading="Connect" className="px-3 py-3 mt-2 text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] border-t border-white/5">
                <Command.Item 
                  onSelect={() => runCommand(() => window.open("https://github.com/abelion512", "_blank"))}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-default select-none text-[13px] font-medium text-text-secondary data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:shadow-lg data-[selected=true]:shadow-primary/20 transition-all group active-haptic"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-data-[selected=true]:bg-white/20">
                    <Github size={16} className="text-text-secondary group-data-[selected=true]:text-white" />
                  </div>
                  <span className="grow">GitHub Profile</span>
                  <ChevronLeft size={14} className="opacity-0 group-data-[selected=true]:opacity-40 rotate-180" />
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => window.location.href = "mailto:ihsanuddinsalav.me@gmail.com")}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-default select-none text-[13px] font-medium text-text-secondary data-[selected=true]:bg-primary data-[selected=true]:text-white data-[selected=true]:shadow-lg data-[selected=true]:shadow-primary/20 transition-all group active-haptic"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-data-[selected=true]:bg-white/20">
                    <Mail size={16} className="text-text-secondary group-data-[selected=true]:text-white" />
                  </div>
                  <span className="grow">Contact via Email</span>
                  <ChevronLeft size={14} className="opacity-0 group-data-[selected=true]:opacity-40 rotate-180" />
                </Command.Item>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] text-[10px] text-text-secondary/40 font-mono border-t border-white/5">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 leading-none">↵</kbd> select</span>
                <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 leading-none">↑↓</kbd> navigate</span>
              </div>
              <span className="flex items-center gap-2"><kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 leading-none">esc</kbd> close</span>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  );
}
