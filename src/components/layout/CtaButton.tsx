import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";

export const CTA_LABEL = "Reserva una demo de 15 min";

/**
 * Única llamada a la acción principal de la web (RF-01). Cápsula al estilo de apple.com/services
 * (RF-46): sus colores salen del tono de la sección, así que se invierte sola sobre negro (CL-13).
 */
export function CtaButton({ className = "" }: { className?: string }) {
  return (
    <ExternalLink
      href={site.bookingUrl}
      data-cta="primary"
      className={`inline-flex min-h-11 items-center justify-center rounded-full bg-btn px-[22px] py-[11px] text-[17px] font-medium text-on-btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
    >
      {CTA_LABEL}
    </ExternalLink>
  );
}
