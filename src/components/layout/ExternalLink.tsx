import type { AnchorHTMLAttributes } from "react";
import { externalLinkProps } from "@/lib/links";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> & { href: string };

/** Enlace a otro dominio: pestaña nueva y sin acceso a la página de origen (RF-27). */
export function ExternalLink(props: Props) {
  return <a {...props} {...externalLinkProps} />;
}
