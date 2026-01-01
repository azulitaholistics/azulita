import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Azulita Holistics',
  url: 'https://azulitaholistics.com',
  description: 'Professional homeopathy, reiki, and holistic healing services',
  instagram: '@azulitaholistics',
  email: 'azulitaholistics@gmail.com',
};

export const metadata = {
  en: {
    home: {
      title: 'Azulita Holistics | Natural Healing & Wellness',
      description: 'Professional homeopathy, reiki, and holistic healing services. Natural, gentle treatments tailored to your unique health needs.',
      keywords: [
        'homeopathy',
        'reiki',
        'holistic healing',
        'natural medicine',
        'energy healing',
        'wellness',
        'alternative medicine',
        'natural remedies',
        'holistic health',
      ],
    },
    about: {
      title: 'About | Azulita Holistics',
      description: 'Learn about our compassionate approach to natural healing through homeopathy and reiki. Personalized wellness care treating the whole person.',
      keywords: [
        'holistic practitioner',
        'homeopathy specialist',
        'reiki master',
        'natural healing',
        'personalized wellness',
        'holistic approach',
      ],
    },
    services: {
      title: 'Services | Azulita Holistics',
      description: 'Homeopathy consultations, reiki sessions, and holistic wellness coaching. Individualized natural healing treatments for mind, body, and spirit.',
      keywords: [
        'homeopathy consultation',
        'reiki session',
        'wellness coaching',
        'natural healing services',
        'energy healing',
        'chakra balancing',
        'holistic treatment',
      ],
    },
  },
  es: {
    home: {
      title: 'Azulita Holistics | Sanación Natural y Bienestar',
      description: 'Servicios profesionales de homeopatía, reiki y sanación holística. Tratamientos naturales y suaves adaptados a tus necesidades únicas de salud.',
      keywords: [
        'homeopatía',
        'reiki',
        'sanación holística',
        'medicina natural',
        'sanación energética',
        'bienestar',
        'medicina alternativa',
        'remedios naturales',
        'salud holística',
      ],
    },
    about: {
      title: 'Sobre Mí | Azulita Holistics',
      description: 'Conoce nuestro enfoque compasivo hacia la sanación natural a través de la homeopatía y el reiki. Cuidado personalizado tratando a la persona completa.',
      keywords: [
        'practicante holístico',
        'especialista en homeopatía',
        'maestro de reiki',
        'sanación natural',
        'bienestar personalizado',
        'enfoque holístico',
      ],
    },
    services: {
      title: 'Servicios | Azulita Holistics',
      description: 'Consultas de homeopatía, sesiones de reiki y coaching de bienestar holístico. Tratamientos naturales individualizados para mente, cuerpo y espíritu.',
      keywords: [
        'consulta de homeopatía',
        'sesión de reiki',
        'coaching de bienestar',
        'servicios de sanación natural',
        'sanación energética',
        'equilibrio de chakras',
        'tratamiento holístico',
      ],
    },
  },
};

export function generatePageMetadata(
  page: 'home' | 'about' | 'services',
  lang: 'en' | 'es' = 'en'
): Metadata {
  const pageMetadata = metadata[lang][page];
  const langPath = lang === 'es' ? '/es' : '';
  const pagePath = page === 'home' ? '' : `/${page}`;

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: `${langPath}${pagePath}`,
      languages: {
        en: pagePath || '/',
        es: `/es${pagePath}`,
      },
    },
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: `${siteConfig.url}${langPath}${pagePath}`,
      siteName: siteConfig.name,
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Natural Healing & Wellness`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
