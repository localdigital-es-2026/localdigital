import { site } from "@/content/site";
import { CtaButton } from "@/components/layout/CtaButton";
import type { SectionProps } from "./types";

/** Programa piloto como banda azul con las plazas que quedan y el botón en blanco (RF-56, v1.8). */
export function Pilot({ section, tone }: SectionProps<"pilot">) {
  const { remaining, total } = site.pilot;
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide">{section.eyebrow}</p>
        <h2 className="text-[30px] md:text-[44px]">{section.title}</h2>
        <p className="text-xl">{section.body}</p>
        <div className="text-lg">
          <p>{section.asksIntro}</p>
          <ul className="mt-1 flex flex-col">
            {section.asks.map((ask) => (
              <li key={ask}>{ask}</li>
            ))}
          </ul>
        </div>
        <p className="font-semibold">
          Quedan {remaining} de {total} plazas.
        </p>
        <CtaButton className="mt-2" />
      </div>
    </section>
  );
}
