import { Lock } from "lucide-react";
import type { SectionProps } from "./types";

export function DataPrivacy({ section, tone }: SectionProps<"privacy">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <h2>{section.title}</h2>
        <ul className="flex flex-col gap-3">
          {section.points.map((point) => (
            <li key={point} className="flex gap-3">
              <Lock aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-secondary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
