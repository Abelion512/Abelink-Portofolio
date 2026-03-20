"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, LayoutGrid, Trophy, Code2, Sparkles, MessageSquare, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/", icon: <Cpu size={18} /> },
  { name: "Projects", href: "/projects", icon: <LayoutGrid size={18} /> },
  { name: "Achievements", href: "/achievements", icon: <Trophy size={18} /> },
  { name: "Stack", href: "/stack", icon: <Code2 size={18} /> },
  { name: "Chat", href: "/chat", icon: <Sparkles size={18} /> },
  { name: "Guestbook", href: "/guestbook", icon: <MessageSquare size={18} /> },
  { name: "About", href: "/about", icon: <User size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled 
            ? "bg-base/80 backdrop-blur-xl border-b border-border shadow-lg py-3" 
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex flex-col group">
          <span className="font-display font-bold text-2xl tracking-tight text-text-primary group-hover:text-primary transition-colors">
            Abelink
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-text-secondary uppercase">
            Ihsanuddin Salav
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-surface/40 backdrop-blur-md p-1 rounded-2xl border border-border/50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === item.href
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button (Optional/Future: Login) */}
        <div className="hidden lg:block w-[120px] text-right">
          <Link href="/contact" className="text-xs font-mono text-primary hover:underline">
            Let's Talk _
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-2xl flex flex-col pt-24 px-8 lg:hidden"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 py-4 text-3xl font-display font-bold ${
                    pathname === item.href ? "text-primary" : "text-text-secondary"
                  }`}
                >
                  <span className="text-primary/50">{item.icon}</span>
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
