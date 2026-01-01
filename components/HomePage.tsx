import { Hero } from '@/components/Hero';
import { StructuredData } from '@/components/StructuredData';

interface HomePageProps {
  lang: 'en' | 'es';
}

export default function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <StructuredData type="home" lang={lang} />
      <div>
        <Hero />
      </div>
    </>
  );
}
