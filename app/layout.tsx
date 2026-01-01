import type { Metadata } from "next";
import { Spectral, Karla } from "next/font/google";
import "@/styles/globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Layout } from "@/components/Layout";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-spectral",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Azulita Holistics | Natural Healing & Wellness",
    template: "%s | Azulita Holistics",
  },
  description: "Professional homeopathy, reiki, and holistic healing services",
  icons: {
    icon: "/azulita.svg",
    apple: "/azulita.svg",
  },
  verification: {
    google: "google-site-verification-code", // Add actual code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spectral.variable} ${karla.variable} antialiased`}>
        <LanguageProvider>
          <Layout>{children}</Layout>
        </LanguageProvider>
      </body>
    </html>
  );
}
