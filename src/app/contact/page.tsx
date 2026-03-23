"use client";

import { motion } from "motion/react";
import { Mail, Github, Instagram } from "lucide-react";
import { useLangStore } from "@/store/languageStore";

export default function Contact() {
  const { t } = useLangStore();

  const contactLinks = [
    {
      id: "email",
      label: "Email",
      value: "agen.salva@gmail.com",
      href: "mailto:agen.salva@gmail.com",
      icon: <Mail size={24} />,
    },
    {
      id: "github",
      label: "GitHub",
      value: "@Abelion512",
      href: "https://github.com/Abelion512",
      icon: <Github size={24} />,
    },
    {
      id: "instagram",
      label: "Instagram",
      value: "@ihsanovid",
      href: "https://instagram.com/ihsanovid",
      // Menggunakan label teks fallback sederhana karena lucide-react tidak memiliki icon Instagram secara default dengan nama "Instagram", 
      // namun kita bisa membungkusnya dalam path svg jika dibutuhkan. Mari kita coba cek lucide-react punya 'Instagram'
      icon: <Instagram size={24} />,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-32 min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center"
      >
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gradient">
            {t('contact.title')}
          </h1>
          <p className="text-[--color-text-secondary] text-lg md:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid gap-6">
          {contactLinks.map((link, idx) => (
            <motion.a
              key={link.id}
              href={link.href}
              target={link.id !== "email" ? "_blank" : undefined}
              rel={link.id !== "email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="glass p-6 md:p-8 rounded-[2rem] border-[--color-border]/50 flex items-center gap-6 hover:bg-surface/50 hover:border-[--color-primary]/30 transition-all group"
            >
              <div className="p-4 bg-surface rounded-2xl group-hover:scale-110 group-hover:bg-[--color-primary]/10 transition-all border border-[--color-border]/50 text-[--color-text-secondary] group-hover:text-[--color-primary]">
                {link.icon}
              </div>
              <div className="text-left">
                <p className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-1">{link.label}</p>
                <p className="font-bold text-[--color-text-primary] group-hover:text-[--color-primary] transition-colors text-lg md:text-xl">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-6 bg-[--color-primary]/5 border border-[--color-primary]/20 rounded-3xl"
        >
          <p className="text-xs font-mono text-[--color-primary] leading-relaxed">
            {t('contact.available')}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
