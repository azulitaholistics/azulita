import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export default function SpanishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider initialLanguage="es">
      {children}
    </LanguageProvider>
  );
}
