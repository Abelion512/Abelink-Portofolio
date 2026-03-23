"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Trophy, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { useLangStore } from '@/store/languageStore';
import { useEffect, useState } from 'react';

const ITEMS = [
  { href: '/',             icon: Home,       label: 'nav.home' },
  { href: '/projects',     icon: FolderOpen, label: 'nav.projects' },
  { href: '/achievements', icon: Trophy,     label: 'nav.achievements' },
  { href: '/stack',        icon: Layers,     label: 'nav.stack' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLangStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-base/80 backdrop-blur-xl pb-safe">
      <div className="flex items-center justify-around px-2 py-3">
        {ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link 
              key={href} 
              href={href} 
              aria-label={t(label)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
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
