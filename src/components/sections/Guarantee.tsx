import type { SectionProps } from "./types";

export function Guarantee({ section, tone }: SectionProps<"guarantee">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <h2>{section.title}</h2>
        <ul className="flex flex-col gap-3">
          {section.points.map((point) => (
            <li key={point.title}>
              <strong>{point.title}</strong> {point.body}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
