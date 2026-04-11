import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppFloating from "@/components/WhatsAppFloating";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local Digital | Desarrollo Web en Madrid y Agentes de IA para Negocios",
  description: "Especialistas en transformar negocios locales en Madrid. Creamos webs de alto rendimiento, sistemas de reservas y agentes de IA. ¡Multiplica tu alcance hoy!",
  keywords: ["Desarrollo Web en Madrid", "Sistemas de Reservas", "Agentes de IA para negocios", "SEO Local", "Diseño web Madrid"],
  openGraph: {
    title: "Local Digital | Desarrollo Web en Madrid y Agentes de IA",
    description: "Digitaliza tu esencia y multiplica tu alcance con webs rápidas, sistemas de reservas e IA.",
    url: "https://www.localdigital.es/",
    siteName: "Local Digital",
    images: [
      {
        url: "https://www.localdigital.es/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Local Digital - Diseño web profesional para empresas en Madrid",
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
    "telephone": "+34606701267",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Madrid",
      "addressRegion": "Madrid",
      "addressCountry": "ES"
    },
    "description": "Especialistas en transformar negocios locales en Madrid. Creamos webs de alto rendimiento, sistemas de reservas y agentes de IA.",
    "priceRange": "$$"
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
