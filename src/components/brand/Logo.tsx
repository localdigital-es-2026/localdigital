import { site } from "@/content/site";

/**
 * Logotipo (caracola gris con relieve) + nombre (RF-42, v1.3). La misma imagen sirve
 * para fondos claros y oscuros. Derivado optimizado del SVG facilitado (D-26).
 */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-3d.webp" alt="" width={26} height={28} className="h-7 w-auto" />
      <span className="text-xl font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
