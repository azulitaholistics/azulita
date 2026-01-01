'use client';

import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { LanguageBanner } from './LanguageBanner';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <LanguageBanner />
      <main id="main-content" className="flex-grow main-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
