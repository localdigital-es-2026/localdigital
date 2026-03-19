import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppFloating from "@/components/WhatsAppFloating";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Local Digital | Digitaliza tu esencia, multiplica tu alcance",
  description: "Especialistas en transformar negocios locales tradicionales en potencias digitales de alto rendimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
