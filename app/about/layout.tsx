import { StructuredData } from '@/components/StructuredData';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('about', 'en');

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData type="about" lang="en" />
      {children}
    </>
  );
}
