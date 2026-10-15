import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { politicaPrivacidad } from "@/content/legal";

export const metadata: Metadata = {
  title: `${politicaPrivacidad.title} · Local Digital`,
  description: politicaPrivacidad.description,
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PoliticaPrivacidad() {
  return <LegalDocument page={politicaPrivacidad} />;
}
