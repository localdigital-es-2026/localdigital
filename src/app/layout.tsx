import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppFloating from "@/components/WhatsAppFloating";
import CookieBanner from "@/components/CookieBanner";
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.localdigital.es"),
  title: "Local Digital | Más clientes para tu negocio local con web, SEO e IA",
  description: "Creamos webs que consiguen clientes, posicionamos tu negocio en Google Maps y automatizamos la captación con IA. Presupuesto gratis y sin compromiso.",
  keywords: [
    "diseño web para negocios locales",
    "web que consigue clientes",
    "SEO local Madrid",
    "aparecer primero en Google Maps",
    "automatización con IA para negocios",
    "agente IA para negocios locales",
    "página web para comercios",
    "más clientes para mi negocio",
    "desarrollo web Madrid",
  ],
  openGraph: {
    title: "Local Digital | Más clientes para tu negocio local",
    description: "Web, SEO local e IA para que tu negocio consiga más clientes. Presupuesto gratis.",
    url: "https://www.localdigital.es/",
    siteName: "Local Digital",
    images: [
      {
        url: "https://www.localdigital.es/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Local Digital - Más clientes para negocios locales",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: 'https://www.localdigital.es/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Local Digital",
    "image": "https://www.localdigital.es/og-image.jpg",
    "url": "https://www.localdigital.es/",
    "telephone": "+34603038050",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "addressCountry": "ES"
    },
    "description": "Especialistas en transformar negocios locales en Madrid. Creamos webs de alto rendimiento, sistemas de reservas y agentes de IA.",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  return (
    <html lang="es" className="scroll-smooth">
      <GoogleTagManager gtmId="GTM-NXXPK3D4" />
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppFloating />
        <CookieBanner />
      </body>
    </html>
  );
}
