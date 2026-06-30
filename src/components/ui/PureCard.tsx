"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { site } from "@/config/site";
import { QRCodeSVG } from "qrcode.react";
import { Share, Mail, Github, Instagram, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export default function PureCard() {
  const portfolioUrl = site.url;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: site.name, url: portfolioUrl }); }
      catch { /* user cancelled */ }
    } else {
      // Fallback: copy URL
      try {
        await navigator.clipboard.writeText(portfolioUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        prompt("Copy this URL:", portfolioUrl);
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="relative group">
          {/* External Border Glow (Silver) */}
          <div className="absolute -inset-px bg-linear-to-br from-neutral-400 via-neutral-100 to-neutral-500 rounded-[2.6rem] blur-[1px] opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

          <div className="relative rounded-[2.5rem] bg-neutral-950 border border-white/10 p-8 shadow-2xl overflow-hidden">
            {/* Metallic Edge (Inner Stroke) */}
            <div className="absolute inset-0 rounded-[2.5rem] p-[1.5px] bg-linear-to-br from-neutral-200/40 via-neutral-500/20 to-neutral-200/40 opacity-70 pointer-events-none" />

            {/* Glossy Reflective Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

            {/* Subtle top-right share action */}
            <button
              onClick={handleShare}
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-20 cursor-pointer"
              aria-label="Share"
            >
              {copied ? <Check size={18} strokeWidth={1.5} /> : <Share size={18} strokeWidth={1.5} />}
            </button>

            {/* Core Profile Focus */}
            <div className="flex flex-col items-start space-y-6 mt-4 relative z-10">
              {/* Profile avatar with image support */}
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-white/10 flex items-center justify-center shadow-xl overflow-hidden shrink-0">
                {site.avatar ? (
                  <Image src={site.avatar} alt={site.name} width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display font-black text-2xl text-white tracking-widest">
                    {site.initials || "IS"}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h1 className="font-display font-bold text-3xl tracking-tight text-white">
                  {site.name}
                </h1>
                <p className="font-mono text-sm text-neutral-400">
                  Software Engineer & Builder
                </p>
              </div>

              <p className="text-sm text-neutral-500 leading-relaxed font-body max-w-60">
                Crafting minimal, functional, and scalable intelligence. Based
                in Surabaya, Indonesia.
              </p>
            </div>

            <div className="h-px w-full bg-[--color-border]/30 my-8" />

            {/* Socials & QR */}
            <div className="flex items-center justify-between relative z-20 mt-8">
              <div className="flex gap-4">
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/40 hover:text-white transition-all hover:scale-110 cursor-pointer active-haptic-sm"
                  aria-label="Email"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110 cursor-pointer active-haptic-sm"
                  aria-label="GitHub"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110 cursor-pointer active-haptic-sm"
                  aria-label="Instagram"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110 cursor-pointer active-haptic-sm"
                  aria-label="Portfolio"
                >
                  <LinkIcon size={20} strokeWidth={1.5} />
                </a>
              </div>

              {/* QR Code → site.url */}
              <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 opacity-80 hover:opacity-100 transition-opacity">
                <QRCodeSVG
                  value={portfolioUrl}
                  size={48}
                  level="M"
                  fgColor="#FFFFFF"
                  bgColor="transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
