import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";

export const CTA_LABEL = "Reserva una demo de 15 min";

/** Única llamada a la acción principal de la web (RF-01). */
export function CtaButton({ className = "" }: { className?: string }) {
  return (
    <ExternalLink
      href={site.bookingUrl}
      data-cta="primary"
      className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.35)] bg-accent px-6 py-3 text-base font-semibold text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${className}`}
    >
      {CTA_LABEL}
    </ExternalLink>
  );
}
