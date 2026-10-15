import { Globe, MapPin, MessageCircle } from "lucide-react";
import { NoteRef } from "./NoteRef";
import type { SectionProps } from "./types";

const ICONS = { chat: MessageCircle, web: Globe, map: MapPin };

/** Un bloque por servicio con la misma plantilla y sin botones (RF-38). */
export function Services({ section, tone }: SectionProps<"services">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2>{section.title}</h2>
          <p className="text-lg">{section.intro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {section.blocks.map((block) => {
            const Icon = ICONS[block.icon];
            return (
              <article key={block.name} data-service className="flex flex-col gap-3 rounded-3xl bg-background p-6">
                <Icon aria-hidden="true" className="h-8 w-8 text-accent" />
                <h3>{block.name}</h3>
                <p className="text-lg">{block.title}</p>
                <p data-service-price className="font-semibold">
                  {block.price}
                  <NoteRef id={1} />
                </p>
                <a href={block.link.href} className="ld-more mt-auto inline-flex min-h-11 items-center">
                  {block.link.label}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
