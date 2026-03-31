import {
  Home,
  FolderOpen,
  Trophy,
  Layers,
  Clock,
  CreditCard,
  Play,
  User,
} from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "nav.home", icon: Home },
  { href: "/projects", label: "nav.projects", icon: FolderOpen },
  { href: "/achievements", label: "nav.achievements", icon: Trophy },
  { href: "/stack", label: "nav.stack", icon: Layers },
  { href: "/about", label: "nav.about", icon: User },
  // Secondary items (accessible via CMD+K or footer)
  { href: "/creation", label: "nav.creation", icon: Play },
  { href: "/changelog", label: "nav.changelog", icon: Clock },
  { href: "/card", label: "nav.card", icon: CreditCard },
] as const;
