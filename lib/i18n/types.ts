// Language type
export type Language = "en" | "es";

// Navigation content
export interface NavContent {
  home: string;
  about: string;
  services: string;
}

// Hero section content
export interface HeroContent {
  title: string;
  tagline: string;
  subtitle: string;
  freeConsultation: string;
  cta: string;
  callToAction: string;
}

// Home page content
export interface HomeContent {
  hero: HeroContent;
}

// About page content
export interface AboutContent {
  title: string;
  freeConsultation: string;
  bio: string[];
  contact: string;
}

// Services page content
export interface ServicesContent {
  title: string;
  intro: string;
  freeConsultation: string;
  services: Array<{
    title: string;
    price: string;
    description: string;
    note?: string;
  }>;
  closingText: string;
}

// Footer content
export interface FooterContent {
  contact: {
    title: string;
    email: string;
    instagram: string;
  };
  copyright: string;
}

// Complete content structure
export interface ContentStructure {
  nav: NavContent;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  footer: FooterContent;
}

// Metadata for SEO
export interface PageMetadata {
  title: string;
  description: string;
  ogImage?: string;
}

export interface MetadataStructure {
  home: PageMetadata;
  about: PageMetadata;
  services: PageMetadata;
}
