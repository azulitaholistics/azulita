import { siteConfig } from '@/lib/metadata';

interface StructuredDataProps {
  type: 'home' | 'about' | 'services';
  lang?: 'en' | 'es';
}

export function StructuredData({ type, lang = 'en' }: StructuredDataProps) {
  const baseUrl = siteConfig.url;
  const langPath = lang === 'es' ? '/es' : '';

  // Organization schema for home page
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/azulita.svg`,
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: [`https://instagram.com/${siteConfig.instagram.replace('@', '')}`],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Holistic Healing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Homeopathy Consultation',
            description:
              'Individualized homeopathic treatment plans based on your complete health picture',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reiki Healing Session',
            description:
              'Gentle energy healing to restore balance and promote deep relaxation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Holistic Wellness Coaching',
            description:
              'Comprehensive guidance for mind, body, and spirit wellness',
          },
        },
      ],
    },
  };

  // Professional service schema
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: `${baseUrl}${langPath}/services`,
    description:
      'Professional homeopathy, reiki, and holistic wellness services',
    serviceType: ['Homeopathy', 'Reiki', 'Holistic Wellness', 'Energy Healing'],
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  };

  // FAQ schema for AI search engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is homeopathy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Homeopathy is a natural healing system that uses gentle remedies tailored to your unique constitution and health needs. It treats the whole person rather than just symptoms.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is reiki?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Reiki is an energy healing practice that promotes deep relaxation, reduces stress, and supports your body\'s natural healing processes through gentle touch and energy work.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does Azulita Holistics offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Azulita Holistics offers homeopathy consultations, reiki healing sessions, and holistic wellness coaching. All treatments are personalized to address your unique health needs.',
        },
      },
    ],
  };

  // WebSite schema for search engines
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/azulita.svg`,
      },
    },
  };

  // Select schemas based on page type
  const schemas = [];

  if (type === 'home') {
    schemas.push(organizationSchema, websiteSchema, faqSchema);
  } else if (type === 'services') {
    schemas.push(professionalServiceSchema, faqSchema);
  } else if (type === 'about') {
    schemas.push(organizationSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
