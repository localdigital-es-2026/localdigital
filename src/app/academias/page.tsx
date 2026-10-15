import Footer from "@/components/layout/Footer";
import { NavMinimal } from "@/components/layout/NavMinimal";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { academias } from "@/content/academias";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(academias);

export default function Academias() {
  return (
    <>
      <NavMinimal />
      <main id="contenido">
        <SectionRenderer sections={academias.sections} darkSections={academias.darkSections} />
      </main>
      <Footer backToHub />
    </>
  );
}
