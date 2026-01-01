'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Language } from './types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  // Initialize with the route-based language (server-safe)
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isClient, setIsClient] = useState(false);

  // After hydration, check localStorage preference
  React.useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem('language') as Language | null;
      if (stored === 'en' || stored === 'es') {
        setLanguageState(stored);
      }
    } catch {
      // Safari private mode or localStorage disabled - fail silently
    }
  }, []);

  // Persist language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isClient) {
      try {
        localStorage.setItem('language', lang);
      } catch {
        // Safari private mode or localStorage disabled - fail silently
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}
