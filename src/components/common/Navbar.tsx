"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, User, LayoutGrid, Cpu, Trophy, Menu, X, Sparkles, MessageSquare } from "lucide-react";
import { useState } from "react";

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

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 backdrop-blur-md bg-base/80 border-b border-border/50"
      >
        <Link href="/" className="flex flex-col group shrink-0">
          <span className="font-display font-bold text-xl leading-none group-hover:text-olivx-purple transition-colors">
            Abelion
          </span>
          <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mt-0.5 hidden sm:block">
            Ihsanuddin Salav
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-surface/50 ${
                pathname === item.href
                  ? "text-olivx-purple bg-surface/80"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface/50 transition-all"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-base/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 text-2xl font-display font-bold transition-colors ${
                  pathname === item.href
                    ? "text-olivx-purple"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
