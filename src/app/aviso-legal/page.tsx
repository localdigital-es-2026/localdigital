import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { avisoLegal } from "@/content/legal";

export const metadata: Metadata = {
  title: `${avisoLegal.title} · Local Digital`,
  description: avisoLegal.description,
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegal() {
  return <LegalDocument page={avisoLegal} />;
}
