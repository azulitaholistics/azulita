'use client';

import { useLanguageToggle } from '@/lib/i18n/useLanguageToggle';

export function LanguageBanner() {
  const { toggleLanguage, language } = useLanguageToggle();

  return (
    <div className="bg-white border-b border-neutral/40 shadow-sm">
      <div className="container-custom py-3 text-center">
        <button
          onClick={toggleLanguage}
          className="text-sm font-medium text-secondary/80 hover:text-secondary inline-flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-neutral-light/60 transition-all"
          aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          {language === 'en' ? 'Haz clic aquí para español' : 'Click here for English'}
        </button>
      </div>
    </div>
  );
}
