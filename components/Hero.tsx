"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { BOOKING_URL } from "@/lib/constants";

export function Hero() {
  const { content, language } = useLanguage();

  const getLocalizedPath = (path: string) => {
    return language === "es" ? `/es${path}` : path;
  };

  return (
    <section className="hero-section">
      <div className="container-custom">
        {/* Logo and Title Group
            - mb-0: no margin below, tagline pulls up with negative margin */}
        <div className="flex items-center justify-center gap-0 mb-0 animate-fade-in-up">
          <Image
            src="/images/azulita.png"
            alt="Azulita butterfly logo"
            width={80}
            height={80}
            className="h-16 md:h-20 animate-float"
            style={{ width: "auto" }}
          />
          <h1 className="hero-title !mb-0" style={{ color: 'var(--color-brand-blue)' }}>
            {content.home.hero.title}
          </h1>
        </div>

        {/* Services Tagline (Homeopathy · Holistic Coaching · Reiki)
            - text-[1.2rem] etc: custom font sizes between Tailwind steps
            - -mt-1 md:-mt-2: pulls tagline up close to butterfly
            - mb-4 md:mb-5: spacing before subtitle */}
        <p
          className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.65rem] font-semibold -mt-1 md:-mt-2 mb-4 md:mb-5 animate-fade-in-up animation-delay-200"
          style={{ color: 'var(--color-brand-blue)' }}
        >
          {content.home.hero.tagline}
        </p>

        {/* Subtitle - Value Proposition
            - !mb-4 md:!mb-5: matches tagline spacing above for visual consistency */}
        <p className="hero-subtitle !mb-4 md:!mb-5 animate-fade-in-up animation-delay-300">
          {content.home.hero.subtitle}
        </p>

        {/* Primary CTA Group
            - cta-group-primary has gap: 0.4rem (in components.css) for tight button spacing */}
        <div className="cta-group-primary text-center animate-scale-in animation-delay-400">
          <p className="cta-text">{content.home.hero.freeConsultation}</p>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-enhanced"
          >
            {content.home.hero.cta}
          </a>

          {/* -mt-px: 1px nudge up to visually balance spacing around button */}
          <p className="cta-text-secondary -mt-px">
            {content.home.hero.callToAction}
          </p>
        </div>

        {/* Secondary CTA Group (Services / About buttons)
            - mt-4 md:mt-5: space above border line
            - pt-3 md:pt-4: space below border line */}
        <div className="flex flex-row gap-4 justify-center mt-4 md:mt-5 pt-3 md:pt-4 border-t border-neutral/30 animate-fade-in animation-delay-600">
          <Link
            href={getLocalizedPath("/services")}
            className="btn-secondary inline-block min-w-[140px]"
          >
            {content.nav.services}
          </Link>
          <Link
            href={getLocalizedPath("/about")}
            className="btn-secondary inline-block min-w-[140px]"
          >
            {content.nav.about}
          </Link>
        </div>
      </div>
    </section>
  );
}
