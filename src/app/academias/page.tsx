import Footer from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { academias } from "@/content/academias";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(academias);

export default function Academias() {
  return (
    <>
      <SiteHeader variant="landing" />
      <main id="contenido">
        <SectionRenderer sections={academias.sections} />
      </main>
      <Footer backToHub />
    </>
  );
}
