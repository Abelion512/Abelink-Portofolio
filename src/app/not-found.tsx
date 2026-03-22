"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass p-12 rounded-3xl border border-white/10 max-w-lg w-full relative overflow-hidden"
      >
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        
        <Terminal size={48} className="text-text-secondary mx-auto mb-6" />
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8 font-mono text-sm leading-relaxed">
          Penyelidikan tidak menemukan halaman yang Anda tuju. 
          Bisa jadi URL salah ketik atau halaman telah dipindahkan.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-text-primary transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
