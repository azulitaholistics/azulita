'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { useLanguageToggle } from '@/lib/i18n/useLanguageToggle';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, language } = useLanguage();
  const { toggleLanguage } = useLanguageToggle();

  const getLocalizedPath = (path: string) => {
    return language === 'es' ? `/es${path}` : path;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md text-white shadow-lg" style={{
      background: `linear-gradient(to right, rgba(var(--color-nav-start-rgb), 0.95), rgba(var(--color-nav-mid-rgb), 0.95), rgba(var(--color-nav-end-rgb), 0.95))`
    }}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 border-2 border-white/80 rounded-full hover:bg-white hover:text-primary transition-all font-semibold text-sm backdrop-blur-sm hover:shadow-lg"
            aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
          >
            {language === 'en' ? '🇲🇽 ES' : '🇺🇸 EN'}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={getLocalizedPath('/')}
              className="hover:text-accent-bright transition-colors font-medium tracking-wide relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-bright after:transition-all hover:after:w-full"
            >
              {content.nav.home}
            </Link>
            <Link
              href={getLocalizedPath('/services')}
              className="hover:text-accent-bright transition-colors font-medium tracking-wide relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-bright after:transition-all hover:after:w-full"
            >
              {content.nav.services}
            </Link>
            <Link
              href={getLocalizedPath('/about')}
              className="hover:text-accent-bright transition-colors font-medium tracking-wide relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-bright after:transition-all hover:after:w-full"
            >
              {content.nav.about}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href={getLocalizedPath('/')}
                className="hover:text-accent-bright transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {content.nav.home}
              </Link>
              <Link
                href={getLocalizedPath('/services')}
                className="hover:text-accent-bright transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {content.nav.services}
              </Link>
              <Link
                href={getLocalizedPath('/about')}
                className="hover:text-accent-bright transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {content.nav.about}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
