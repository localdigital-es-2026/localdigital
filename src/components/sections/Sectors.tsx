import Link from "next/link";
import { site } from "@/content/site";
import type { SectionProps } from "./types";

/**
 * Solo sectores activos, sin «próximamente» (RF-14), en una tarjeta (RF-57). Cuando haya foto real
 * de una academia (P-14), irá en la columna derecha de la tarjeta.
 */
export function Sectors({ section, tone }: SectionProps<"sectors">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {site.activeSectors.map((sector) => (
          <div key={sector.slug} className="flex flex-col gap-4 rounded-[28px] bg-background p-8 md:p-14">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Sectores</p>
            <h2 className="text-[30px] md:text-[40px]">{sector.title}</h2>
            <p className="text-lg text-[#424245] md:text-xl">{sector.summary}</p>
            <Link href={`/${sector.slug}`} className="ld-more text-lg md:text-xl">
              {sector.linkText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
