import type { FeaturedService } from "@/content/types";

/*
 * Dibujos de las tarjetas de servicios (RF-54, D-36): HTML y CSS, sin imágenes ni cifras inventadas
 * (D-37). Cada uno se describe para lectores de pantalla.
 */

/** Resumen mensual de ejemplo: barras sin números (RF-31, D-37). */
export function MonthlySummary({ summary }: { summary: FeaturedService["summary"] }) {
  const widths = ["w-[85%]", "w-[45%]", "w-[70%]"];
  const colors = ["bg-[#25d366]", "bg-blue", "bg-[#1a7f45]"];
  return (
    <div
      role="img"
      aria-label={summary.description}
      data-summary
      className="flex flex-col gap-4 rounded-[20px] bg-white p-6 shadow-[0_10px_30px_rgba(26,127,69,0.12)]"
    >
      <span className="text-[13px] text-[#6e6e73]">{summary.label}</span>
      {summary.items.map((item, index) => (
        <span key={item} className="flex flex-col gap-1.5">
          <span className="text-sm text-[#424245]">{item}</span>
          <span className="h-2 rounded bg-tint-green">
            <span className={`block h-2 rounded ${widths[index % 3]} ${colors[index % 3]}`} />
          </span>
        </span>
      ))}
    </div>
  );
}

/** Portátil y móvil con la web de un negocio y su botón de WhatsApp. */
export function WebMockup() {
  return (
    <div role="img" aria-label="Portátil y móvil mostrando la web de un negocio con su botón de WhatsApp" className="flex items-end gap-3">
      <span className="block flex-1 rounded-[12px_12px_4px_4px] bg-[#1d1d1f] p-2">
        <span className="flex h-[130px] flex-col gap-2 rounded-md bg-white p-3">
          <span className="block h-2.5 w-3/5 rounded-sm bg-[#1d1d1f]" />
          <span className="block h-1.5 w-[85%] rounded-sm bg-[#d2d2d7]" />
          <span className="block h-1.5 w-[70%] rounded-sm bg-[#d2d2d7]" />
          <span className="mt-auto block h-[22px] w-[90px] rounded-full bg-[#25d366]" />
        </span>
      </span>
      <span className="block w-[70px] rounded-[14px] bg-[#1d1d1f] p-[5px]">
        <span className="flex h-[120px] flex-col gap-1.5 rounded-[10px] bg-white p-2">
          <span className="block h-1.5 rounded-sm bg-[#1d1d1f]" />
          <span className="block h-1 rounded-sm bg-[#d2d2d7]" />
          <span className="mt-auto block h-3.5 rounded-full bg-[#25d366]" />
        </span>
      </span>
    </div>
  );
}

/** Ficha de Google Maps con valoración, botón de cómo llegar y de WhatsApp (sin nota numérica). */
export function MapsCard() {
  return (
    <div
      role="img"
      aria-label="Ficha de Google Maps de un negocio con estrellas, botón de cómo llegar y botón de WhatsApp"
      className="flex flex-col gap-2 rounded-2xl bg-white p-[18px] shadow-[0_8px_24px_rgba(180,100,20,0.12)]"
    >
      <span className="flex items-center gap-2.5">
        <span className="block h-7 w-7 -rotate-45 rounded-[50%_50%_50%_0] bg-[#ea4335]" />
        <span className="text-base font-semibold">Tu negocio</span>
      </span>
      <span className="text-sm text-[#b06000]">
        ★★★★★ <span className="text-[#424245]">Abierto ahora</span>
      </span>
      <span className="flex gap-2">
        <span className="rounded-full bg-tint-blue px-2.5 py-1 text-xs text-[#0058b0]">Cómo llegar</span>
        <span className="rounded-full bg-tint-green px-2.5 py-1 text-xs text-[#1a7f45]">WhatsApp</span>
      </span>
    </div>
  );
}
