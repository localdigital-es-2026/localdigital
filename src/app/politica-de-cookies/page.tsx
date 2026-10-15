import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { politicaCookies } from "@/content/legal";

export const metadata: Metadata = {
  title: `${politicaCookies.title} · Local Digital`,
  description: politicaCookies.description,
  alternates: { canonical: "/politica-de-cookies" },
};

export default function PoliticaCookies() {
  return <LegalDocument page={politicaCookies} />;
}
