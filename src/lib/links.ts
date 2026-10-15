import type { SiteData } from "@/content/types";

/** Pestaña nueva sin acceso a la página de origen (RF-27). */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

export function whatsappUrl(phone: string, text?: string): string {
  const digits = phone.replace(/\D/g, "");
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** Enlace «pruébalo ya», solo si hay asistente de ejemplo configurado (RF-02, RF-34). */
export function demoWhatsappUrl(data: SiteData): string | undefined {
  const phone = data.demoWhatsapp?.trim();
  return phone ? whatsappUrl(phone) : undefined;
}
