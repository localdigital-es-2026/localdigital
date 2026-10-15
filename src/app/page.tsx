import Footer from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { hub } from "@/content/hub";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(hub);

// Datos estructurados de negocio local (RF-23).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: `${site.url}/`,
  image: `${site.url}/opengraph-image`,
  telephone: `+${site.phone.replace(/\D/g, "")}`,
  email: site.email,
  description: hub.seo.description,
  areaServed: "ES",
  address: { "@type": "PostalAddress", addressLocality: "Madrid", addressRegion: "Madrid", addressCountry: "ES" },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader variant="hub" />
      <main id="contenido">
        <SectionRenderer sections={hub.sections} />
      </main>
      <Footer />
    </>
  );
}
