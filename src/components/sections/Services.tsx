import { Check, Globe, MapPin, MessageCircle } from "lucide-react";
import { MapsCard, MonthlySummary, WebMockup } from "@/components/illustrations/ServiceVisuals";
import type { ServiceBlock } from "@/content/types";
import { NoteRef } from "./NoteRef";
import type { SectionProps } from "./types";

const ICONS = { chat: MessageCircle, web: Globe, map: MapPin };
const TINTS = { chat: "bg-tint-green", web: "bg-tint-blue", map: "bg-tint-warm" };

/** Nombre, frase, precio con su nota y enlace: lo común a todas las tarjetas (RF-38). */
function CardText({ block }: { block: ServiceBlock }) {
  const Icon = ICONS[block.icon];
  return (
    <>
      <Icon aria-hidden="true" className="h-8 w-8 text-blue" />
      <h3 className="text-[28px] tracking-tight">{block.name}</h3>
      <p className="text-lg text-[#424245]">{block.title}</p>
    </>
  );
}

function CardPrice({ block }: { block: ServiceBlock }) {
  return (
    <>
      <p data-service-price className="font-semibold">
        {block.price}
        <NoteRef id={1} />
      </p>
      <a href={block.link.href} className="ld-more inline-flex min-h-11 items-center self-start">
        {block.link.label}
      </a>
    </>
  );
}

/**
 * Servicios (RF-54, v1.8): el asistente en una tarjeta grande con sus funciones y un resumen
 * dibujado, y la web y Google Maps en dos tarjetas de color. Sin botones (RF-38).
 */
export function Services({ section, tone }: SectionProps<"services">) {
  const [main, ...rest] = section.blocks;
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2>{section.title}</h2>
          <p className="max-w-2xl text-xl text-[#424245]">{section.intro}</p>
        </div>

        <article data-service className={`grid items-center gap-10 rounded-[28px] p-8 md:grid-cols-[3fr_2fr] md:p-12 ${TINTS[main.icon]}`}>
          <div className="flex flex-col gap-4">
            {main.featured && (
              <span className="self-start rounded-full border border-[#1a7f45] px-2.5 py-1 text-xs font-semibold text-[#1a7f45]">
                {main.featured.badge}
              </span>
            )}
            <CardText block={main} />
            {main.featured && (
              <ul className="flex flex-col gap-2.5">
                {main.featured.features.map((feature) => (
                  <li key={feature} data-feature className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-[#1a7f45]" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <CardPrice block={main} />
          </div>
          {main.featured && <MonthlySummary summary={main.featured.summary} />}
        </article>

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((block) => (
            <article key={block.name} data-service className={`flex flex-col gap-4 rounded-[28px] p-8 md:p-10 ${TINTS[block.icon]}`}>
              <CardText block={block} />
              <div className="my-3">{block.icon === "web" ? <WebMockup /> : <MapsCard />}</div>
              <CardPrice block={block} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
