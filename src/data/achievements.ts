export type AchievementType = 'certificate' | 'participation';

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  year: number;
  type: AchievementType;
  image: string;
  credentialUrl?: string;
  validUntil?: string;
  featured: boolean;
}

export const achievements: Achievement[] = [
  {
    id: "dicoding-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    year: 2026,
    type: "certificate",
    image: "/certs/dicoding-dasar-ai.jpg",
    credentialUrl: "https://dicoding.com/certificates/07Z6J9NM2XQR",
    validUntil: "03 Januari 2029",
    featured: true,
  },
  {
    id: "dicoding-financial-literacy",
    title: "Introduction to Financial Literacy",
    issuer: "Dicoding × DBS Foundation",
    year: 2026,
    type: "certificate",
    image: "/certs/dicoding-financial-literacy.jpg",
    credentialUrl: "https://dicoding.com/certificates/1RXYQ9NRQZVM",
    validUntil: "05 Januari 2029",
    featured: false,
  },
  {
    id: "ibm-genai-software-dev",
    title: "Use Generative AI for Software Development",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image: "/certs/ibm-genai-software-dev.jpg",
    credentialUrl: undefined,
    featured: true,
  },
  {
    id: "ibm-granite-models",
    title: "IBM Granite Models for Software Development",
    issuer: "IBM SkillsBuild",
    year: 2025,
    type: "certificate",
    image: "/certs/ibm-granite-models.jpg",
    credentialUrl: undefined,
    featured: false,
  },
  {
    id: "dibimbing-rpa",
    title: "Robotic Process Automation",
    issuer: "Dibimbing.id",
    year: 2026,
    type: "participation",
    image: "/certs/dibimbing-rpa.jpg",
    credentialUrl: undefined,
    featured: false,
  },
  {
    id: "dibimbing-devops",
    title: "DevOps: No DevOps, No Product",
    issuer: "Dibimbing.id × GDGOCBION",
    year: 2026,
    type: "participation",
    image: "/certs/dibimbing-devops.jpg",
    credentialUrl: undefined,
    featured: false,
  },
  {
    id: "dibimbing-data-science-ml",
    title: "Data Science: Practical Introduction to Machine Learning",
    issuer: "Dibimbing.id",
    year: 2025,
    type: "participation",
    image: "/certs/dibimbing-data-science-ml.jpg",
    credentialUrl: undefined,
    featured: false,
  },
];
