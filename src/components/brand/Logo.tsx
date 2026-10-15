import { site } from "@/content/site";

/**
 * Logotipo (caracola) + nombre (RF-42). Azul sobre fondo claro, blanco sobre oscuro.
 * Provisional en PNG hasta tener el SVG original (P-13).
 */
export function Logo({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tone === "light" ? "/brand/logo-azul.png" : "/brand/logo-blanco.png"}
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
      />
      <span className={`text-xl font-semibold tracking-tight ${compact ? "max-sm:sr-only" : ""}`}>{site.name}</span>
    </span>
  );
}
