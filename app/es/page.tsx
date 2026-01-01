import HomePage from '@/components/HomePage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('home', 'es');

export default function Home() {
  return <HomePage lang="es" />;
}
