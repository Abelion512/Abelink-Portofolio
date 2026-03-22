import { en } from './en';
import { id } from './id';

export const translations = {
  en,
  id,
};

export type Lang = 'en' | 'id';
export type TranslationKey = keyof typeof en;
