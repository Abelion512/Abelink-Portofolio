"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Mail, Github, Instagram, ArrowUpRight, CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLangStore } from "@/store/languageStore";

export default function Contact() {
  const { t } = useLangStore();

  const contactLinks = [
    {
      id: "email",
      label: "Email",
      value: "agen.salva@gmail.com",
      href: "mailto:agen.salva@gmail.com",
      icon: <Mail size={20} />,
    },
    {
      id: "github",
      label: "GitHub",
      value: "@Abelion512",
      href: "https://github.com/Abelion512",
      icon: <Github size={20} />,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@ihsanovid",
      href: "https://instagram.com/ihsanovid",
      icon: <Instagram size={20} />,
    },
    {
      id: "support",
      label: "Support",
      value: "Buy me a Ko-fi",
      href: "https://ko-fi.com/abelion",
      icon: <CreditCard size={20} />,
    },
  ];

  const [openToWork, setOpenToWork] = useState(true);

  useEffect(() => {
    supabase.from('settings').select('open_to_work').eq('id', 1).single().then(({ data }) => {
      if (data) setOpenToWork(data.open_to_work);
    });
  }, []);

  return (
    <main className="min-h-screen pt-40 px-6 pb-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-text-primary mb-8">
            {t('contact.title').split(' ')[0]} <span className="text-gradient">{t('contact.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.header>

        <div className="flex flex-col gap-4">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative flex items-center justify-between p-6 md:p-8 bg-surface/20 border border-border/40 rounded-[2rem] hover:border-primary/40 hover:bg-surface/30 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-6 z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-surface/40 rounded-2xl border border-border/50 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
                  {link.icon}
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-1 opacity-60">
                    {link.label}
                  </span>
                  <span className="block text-lg md:text-xl font-bold text-text-primary group-hover:text-text-primary transition-colors">
                    {link.value}
                  </span>
                </div>
              </div>
              
              <div className="z-10 text-text-muted group-hover:text-primary transition-colors">
                <ArrowUpRight size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>

              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 p-8 bg-surface/10 border border-border/20 rounded-3xl"
        >
          <p className="text-xs font-mono text-text-muted uppercase tracking-[0.3em] leading-relaxed">
            {openToWork ? t('hero.status.open') : t('contact.unavailable')}
          </p>
        </motion.div>
      </div>
    </main>
  );
}
