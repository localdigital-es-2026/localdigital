import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { hub } from "@/content/hub";
import { site } from "@/content/site";


const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter", axes: ["opsz"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: hub.seo.title,
  description: hub.seo.description,
  openGraph: {
    siteName: site.name,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
