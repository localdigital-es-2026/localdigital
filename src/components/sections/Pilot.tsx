import { site } from "@/content/site";
import type { SectionProps } from "./types";

export function Pilot({ section, tone }: SectionProps<"pilot">) {
  const { remaining } = site.pilot;
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl border-2 border-accent p-8">
        <p className="text-sm font-semibold uppercase tracking-wide">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p className="text-lg">{section.body}</p>
        <div>
          <p>{section.asksIntro}</p>
          <ul className="mt-2 list-disc pl-6">
            {section.asks.map((ask) => (
              <li key={ask}>{ask}</li>
            ))}
          </ul>
        </div>
        <p className="font-semibold">
          Quedan {remaining} {remaining === 1 ? "plaza" : "plazas"}.
        </p>
      </div>
    </section>
  );
}
