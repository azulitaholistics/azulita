import { StructuredData } from '@/components/StructuredData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('services', 'en');

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData type="services" lang="en" />
      {children}
    </>
  );
}
