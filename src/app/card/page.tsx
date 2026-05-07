"use client";

import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { Share, Mail, Github, Instagram, Link as LinkIcon } from "lucide-react";

export default function DigitalCard() {
  const [mounted, setMounted] = useState(false);
  const portfolioUrl = "https://abelion.vercel.app";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ihsanuddin Salav",
          url: portfolioUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative bg-[--color-base] select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div
          className="relative group"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Anti-Copy Overlay */}
          <div className="absolute inset-0 z-50 pointer-events-auto" />

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
              className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors z-10"
              aria-label="Share"
            >
              <Share size={18} strokeWidth={1.5} />
            </button>

            {/* Core Profile Focus */}
            <div className="flex flex-col items-start space-y-6 mt-4 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-xl backdrop-blur-md">
                <span className="font-display font-black text-2xl text-white tracking-widest">
                  IS
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="font-display font-bold text-3xl tracking-tight text-white">
                  Ihsanuddin Salav
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

            {/* Socials & Small QR aligned elegantly */}
            <div className="flex items-center justify-between relative z-10 mt-8">
              <div className="flex gap-4">
                <a
                  href="mailto:agen.salva@gmail.com"
                  className="text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://github.com/Abelion512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://instagram.com/ihsanovid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <LinkIcon size={20} strokeWidth={1.5} />
                </a>
              </div>

              {/* Minimal QR Code (Scan Only) */}
              <div className="p-1.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 opacity-80 hover:opacity-100 transition-opacity">
                <QRCodeSVG
                  value={`${portfolioUrl}/card`}
                  size={48}
                  level="M"
                  includeMargin={false}
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
