import type { ReactNode } from "react";
import { ExternalLink } from "./ExternalLink";

const CLASSES =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-blue bg-transparent px-[22px] py-[11px] text-center text-[17px] font-medium text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

/** Botón secundario (RF-48): cápsula transparente con contorno azul, como «Ver precios» en apple.com. */
export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} data-secondary className={CLASSES}>
        {children}
      </a>
    );
  }
  return (
    <ExternalLink href={href} data-secondary className={CLASSES}>
      {children}
    </ExternalLink>
  );
}
