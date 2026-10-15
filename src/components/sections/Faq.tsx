import type { SectionProps } from "./types";

/** <details> nativo: funciona sin JavaScript y con teclado (RF-07, D-02). */
export function Faq({ section, tone }: SectionProps<"faq">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <h2>{section.title}</h2>
        <div className="flex flex-col divide-y divide-line border-y border-line">
          {section.items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 text-lg font-semibold after:text-2xl after:content-['+'] group-open:after:content-['−']">
                {item.q}
              </summary>
              <p className="mt-3">
                {item.a}
                {item.pilotNote && ` ${item.pilotNote}`}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
