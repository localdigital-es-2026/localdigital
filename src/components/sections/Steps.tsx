import { StepThumb } from "@/components/illustrations/StepThumb";
import type { SectionProps } from "./types";

/** Tres pasos en tarjetas, cada uno con su miniatura dibujada (RF-55, v1.8). */
export function Steps({ section, tone }: SectionProps<"steps">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <h2 className="text-center">{section.title}</h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {section.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3.5 rounded-3xl bg-background p-7">
              {step.thumb && <StepThumb kind={step.thumb} />}
              <span className="text-sm font-semibold text-blue">Paso {index + 1}</span>
              <h3>{step.title}</h3>
              <p className="text-[#424245]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
