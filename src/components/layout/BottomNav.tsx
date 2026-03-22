"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, LayoutDashboard, Sparkles, Phone } from 'lucide-react';
import { motion } from 'motion/react';

const ITEMS = [
  { href: '/',          icon: Home,            label: 'Home' },
  { href: '/projects',  icon: FolderOpen,      label: 'Projects' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/chat',      icon: Sparkles,        label: 'Chat' },
  { href: '/contact',   icon: Phone,           label: 'Contact' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-base/80 backdrop-blur-xl pb-safe">
      <div className="flex items-center justify-around px-2 py-3">
        {ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link 
              key={href} 
              href={href} 
              aria-label={label}
              className={`relative flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-300 ${
                active ? 'text-primary scale-110' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              
              {active && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
