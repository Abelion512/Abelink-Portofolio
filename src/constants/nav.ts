import { Home, FolderOpen, Trophy, Layers, Sparkles, BookOpen,
         User, LayoutDashboard, Phone, Wrench, Clock, CreditCard } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/',             label: 'nav.home',        icon: Home },
  { href: '/projects',     label: 'nav.projects',    icon: FolderOpen },
  { href: '/achievements', label: 'nav.achievements',icon: Trophy },
  { href: '/stack',        label: 'nav.stack',       icon: Layers },
  { href: '/chat',         label: 'nav.chat',        icon: Sparkles },
  { href: '/guestbook',    label: 'nav.guestbook',   icon: BookOpen },
  { href: '/about',        label: 'nav.about',       icon: User },
  { href: '/dashboard',    label: 'nav.dashboard',   icon: LayoutDashboard },
  { href: '/contact',      label: 'nav.contact',     icon: Phone },
  { href: '/uses',         label: 'nav.uses',        icon: Wrench },
  { href: '/changelog',    label: 'nav.changelog',   icon: Clock },
  { href: '/card',         label: 'nav.card',        icon: CreditCard },
] as const;
