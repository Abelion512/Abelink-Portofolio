"use client";

import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { Download, Share2, Mail, Github, Linkedin, Briefcase } from "lucide-react";

export default function DigitalCard() {
  const [vcard, setVcard] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Create vCard string
    const vcardString = `BEGIN:VCARD
VERSION:3.0
N:Salav;Ihsanuddin;;;
FN:Ihsanuddin Salav
TITLE:Software Engineer / Fullstack Developer
EMAIL:hello@ihsanuddinsalav.my.id
URL:https://ihsanuddinsalav.my.id
NOTE:Builder, Learner, crafting zero-knowledge software and experimental interfaces.
END:VCARD`;
    setVcard(vcardString);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ihsanuddin_Salav.vcf";
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ihsanuddin Salav - Digital Card",
          text: "Check out Ihsanuddin Salav's portfolio and digital business card.",
          url: "https://ihsanuddinsalav.my.id",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* The Card */}
        <div className="glass rounded-[2rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden group">
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shine z-10 pointer-events-none" />

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-24 h-24 rounded-full border-2 border-primary/50 overflow-hidden relative shadow-[0_0_20px_rgba(108,99,255,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-black text-3xl text-white">IS</span>
              </div>
            </div>
            
            <div>
              <h1 className="font-display font-bold text-2xl text-text-primary tracking-tight">Ihsanuddin Salav</h1>
              <p className="font-mono text-sm text-primary mt-1 flex items-center justify-center gap-2">
                <Briefcase size={14} /> Fullstack Engineer
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-8 relative">
            <div className="p-4 bg-white rounded-2xl shadow-xl transition-transform hover:scale-105 duration-300">
              <QRCodeSVG 
                value={vcard} 
                size={160} 
                level="M" 
                includeMargin={false}
                fgColor="#0A0A0A"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-surface border border-white/10 rounded-full text-[10px] font-mono text-text-secondary whitespace-nowrap">
              Scan to save contact
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button 
              onClick={handleDownload}
              className="flex-1 py-3 bg-primary text-white rounded-xl font-bold flex flex-col items-center justify-center gap-1 hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] transition-all"
            >
              <Download size={18} />
              <span className="text-[10px] uppercase tracking-wider">Save</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex-1 py-3 bg-surface/80 border border-white/10 text-text-primary rounded-xl font-bold flex flex-col items-center justify-center gap-1 hover:bg-white/10 transition-all"
            >
              <Share2 size={18} />
              <span className="text-[10px] uppercase tracking-wider">Share</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-6 border-t border-white/10">
            <a href="mailto:hello@ihsanuddinsalav.my.id" className="p-3 bg-surface rounded-full text-text-secondary hover:text-primary transition-colors hover:scale-110">
              <Mail size={18} />
            </a>
            <a href="https://github.com/Abelion512" target="_blank" rel="noopener noreferrer" className="p-3 bg-surface rounded-full text-text-secondary hover:text-text-primary transition-colors hover:scale-110">
              <Github size={18} />
            </a>
            <a href="#" className="p-3 bg-surface rounded-full text-text-secondary hover:text-[#0077b5] transition-colors hover:scale-110">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
