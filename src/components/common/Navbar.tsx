"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, User, LayoutGrid, Cpu, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: <Cpu size={18} /> },
  { name: "Projects", href: "/projects", icon: <LayoutGrid size={18} /> },
  { name: "Stack", href: "/stack", icon: <Code2 size={18} /> },
  { name: "About", href: "/about", icon: <User size={18} /> },
  { name: "Divisions", href: "/divisions", icon: <Code2 size={18} /> },
  { name: "Chat", href: "/chat", icon: <MessageSquare size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-6xl w-full backdrop-blur-md bg-base/80 border-b border-border/50 rounded-b-3xl"
    >
      <Link href="/" className="flex flex-col justify-center group shrink-0 mr-4">
        <span className="font-display font-bold text-xl tracking-tight leading-none text-text-primary group-hover:text-olivx-purple transition-colors">
          Abelion
        </span>
        <span className="text-[10px] font-mono tracking-widest text-text-secondary uppercase mt-0.5 group-hover:text-ai-teal transition-colors">
          Ihsanuddin Salav
        </span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-6">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 hover:bg-surface/50 group ${
              pathname === item.href ? "text-olivx-purple bg-surface/80 shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className={`${pathname === item.href ? "text-olivx-purple" : "text-text-secondary group-hover:text-ai-teal transition-colors"}`}>
              {item.icon}
            </span>
            <span className="text-sm font-medium hidden md:block">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
