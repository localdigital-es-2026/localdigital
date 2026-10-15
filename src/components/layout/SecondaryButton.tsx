import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

/** Botón secundario (RF-46): cápsula transparente con contorno del color del texto, como «Learn more». */
export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ExternalLink
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink bg-transparent px-[22px] py-[11px] text-center text-[17px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {children}
    </ExternalLink>
  );
}
