'use client';

import { useLanguageContext } from './LanguageContext';
import { getContent } from '@/content';

export function useLanguage() {
  const { language, setLanguage } = useLanguageContext();
  const content = getContent(language);

  // Helper function to get nested content by key path
  // e.g., t('home.hero.title') -> content.home.hero.title
  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = content;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation key not found: ${keyPath}`);
        return keyPath;
      }
    }

    return typeof value === 'string' ? value : keyPath;
  };

  return {
    language,
    setLanguage,
    content,
    t,
  };
}
