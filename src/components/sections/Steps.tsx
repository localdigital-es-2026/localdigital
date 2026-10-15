import type { SectionProps } from "./types";

export function Steps({ section, tone }: SectionProps<"steps">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <h2>{section.title}</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {section.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-2">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-bold text-background"
              >
                {index + 1}
              </span>
              <p className="font-semibold">{step.title}</p>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
