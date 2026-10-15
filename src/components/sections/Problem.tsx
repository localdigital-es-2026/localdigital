import { TagPill } from "./TagPill";
import type { SectionProps } from "./types";

export function Problem({ section, tone }: SectionProps<"problem">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <h2>{section.title}</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {section.scenes.map((scene) => (
            <li key={`${scene.title}-${scene.tag ?? ""}`} className="rounded-2xl border border-line bg-background p-6">
              {scene.tag && (
                <p className="mb-2">
                  <TagPill tag={scene.tag} />
                </p>
              )}
              <p>
                <strong>{scene.title}</strong> {scene.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold">{section.closing}</p>
      </div>
    </section>
  );
}
