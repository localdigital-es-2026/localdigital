import Link from "next/link";
import { site } from "@/content/site";
import type { SectionProps } from "./types";

/** Solo sectores activos, sin «próximamente» (RF-14). */
export function Sectors({ section, tone }: SectionProps<"sectors">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        {site.activeSectors.map((sector) => (
          <div key={sector.slug} className="flex flex-col gap-3">
            <h2>{sector.title}</h2>
            <p className="text-lg">{sector.summary}</p>
            <Link href={`/${sector.slug}`} className="font-semibold underline">
              {sector.linkText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
