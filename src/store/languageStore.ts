import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { en } from '@/i18n/en';
import { id } from '@/i18n/id';

type Lang = 'en' | 'id';
interface LangStore {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: 'en',
      setLang: (lang) => set({ lang }),
      t: (key) => {
        const dict = get().lang === 'en' ? en : id;
        return dict[key] ?? key;
      },
    }),
    { name: 'abelion-lang' }
  )
);
