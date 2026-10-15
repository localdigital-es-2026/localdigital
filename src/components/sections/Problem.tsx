import { LockScreen } from "@/components/illustrations/LockScreen";
import { TagPill } from "./TagPill";
import type { SectionProps } from "./types";

/** El dolor en tres escenas y, si la hay, la pantalla de bloqueo dibujada al lado (RF-53, v1.8). */
export function Problem({ section, tone }: SectionProps<"problem">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className={`grid items-center gap-12 ${section.lockScreen ? "md:grid-cols-[3fr_2fr]" : ""}`}>
          <div className="flex flex-col gap-6">
            <h2>{section.title}</h2>
            <ul className={`flex flex-col gap-4 text-lg text-[#424245] ${section.lockScreen ? "" : "md:grid md:grid-cols-3"}`}>
              {section.scenes.map((scene) => (
                <li key={`${scene.title}-${scene.tag ?? ""}`} data-scene>
                  {scene.tag && (
                    <span className="mb-2 block">
                      <TagPill tag={scene.tag} />
                    </span>
                  )}
                  <strong className="text-ink">{scene.title}</strong> {scene.body}
                </li>
              ))}
            </ul>
          </div>
          {section.lockScreen && <LockScreen data={section.lockScreen} />}
        </div>
        <p className="text-[21px] font-semibold tracking-tight md:text-[28px]">{section.closing}</p>
      </div>
    </section>
  );
}
