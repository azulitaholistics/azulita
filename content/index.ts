import { en } from './en';
import { es } from './es';
import type { Language, ContentStructure } from '@/lib/i18n/types';

export const content: Record<Language, ContentStructure> = {
  en,
  es,
};

export function getContent(lang: Language): ContentStructure {
  return content[lang];
}
