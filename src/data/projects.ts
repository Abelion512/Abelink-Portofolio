export type ProjectStatus = 'live' | 'wip' | 'preview';

export interface Project {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  status: ProjectStatus;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  isPinned: boolean;
}

export const projects: Project[] = [
  {
    id: "lembaran",
    name: "Lembaran",
    description: "— (placeholder, update ketika stabil)",
    coverImage: "/projects/lembaran-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "Supabase"],
    isPinned: true,
  },
  {
    id: "olivx",
    name: "OlivX",
    description: "Personal tech ecosystem — AI, automation, and web projects.",
    coverImage: "/projects/olivx-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "n8n", "Supabase", "Docker"],
    githubUrl: "https://github.com/Abelion512",
    isPinned: false,
  },
  {
    id: "abelion-notes",
    name: "Abelion Notes",
    description: "Zero-knowledge encrypted personal notes app.",
    coverImage: "/projects/abelion-notes-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "Dexie.js", "Argon2"],
    isPinned: false,
  },
  {
    id: "ab-pay",
    name: "Ab-Pay",
    description: "Custom modern payment system for digital products.",
    coverImage: "/projects/ab-pay-placeholder.jpg",
    status: "wip",
    tech: ["React", "Node.js", "Supabase"],
    isPinned: false,
  },
  {
    id: "learnink",
    name: "Learnink AI",
    description: "AI-powered learning platform.",
    coverImage: "/projects/learnink-placeholder.jpg",
    status: "wip",
    tech: ["Next.js", "TypeScript", "AI"],
    isPinned: false,
  },
];
