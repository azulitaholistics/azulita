'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from './useLanguage';

/**
 * Shared hook for toggling language across the application.
 * This ensures consistent behavior between the nav button and language banner.
 */
export function useLanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);

    // Convert current path to new language
    if (newLang === 'es') {
      // Going to Spanish
      if (!pathname.startsWith('/es')) {
        const newPath = pathname === '/' ? '/es' : `/es${pathname}`;
        router.push(newPath);
      }
    } else {
      // Going to English
      if (pathname.startsWith('/es')) {
        const newPath = pathname.replace(/^\/es/, '') || '/';
        router.push(newPath);
      }
    }
  };

  return { toggleLanguage, language };
}
