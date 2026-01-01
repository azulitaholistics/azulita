import HomePage from '@/components/HomePage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('home', 'en');

export default function Home() {
  return <HomePage lang="en" />;
}
