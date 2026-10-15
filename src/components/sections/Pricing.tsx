import { ShieldCheck } from "lucide-react";
import { CtaButton } from "@/components/layout/CtaButton";
import { NoteRef } from "./NoteRef";
import type { SectionProps } from "./types";

export function Pricing({ section, tone }: SectionProps<"pricing">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <h2>{section.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {section.plans.map((plan, index) => (
            <article
              key={plan.title}
              className={`flex flex-col gap-3 rounded-2xl bg-background p-6 ${index === 0 ? "border-2 border-accent" : "border border-line"}`}
            >
              <h3>{plan.title}</h3>
              {plan.badge && <p className="text-sm font-semibold">({plan.badge})</p>}
              <ul className="flex flex-col gap-1">
                {plan.lines.map((line) => (
                  <li key={line.text} className="text-lg font-semibold" {...(line.note ? { "data-price-line": "" } : {})}>
                    {line.text}
                    {line.note && <NoteRef id={line.note} />}
                  </li>
                ))}
              </ul>
              {plan.includes && <p>{plan.includes}</p>}
              {plan.includesList && (
                <div>
                  <p className="font-semibold">Incluye:</p>
                  <ul className="mt-1 list-disc pl-6">
                    {plan.includesList.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
        {section.guaranteeLabel && (
          <p className="flex items-start gap-3 font-semibold">
            <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
            <span>
              {section.guaranteeLabel}
              <NoteRef id={2} />
            </span>
          </p>
        )}
        <ol aria-label="Notas" className="flex flex-col gap-1 border-t border-line pt-4 text-sm">
          {section.notes.map((note) => (
            <li key={note.id} id={`nota-${note.id}`} className="scroll-mt-24">
              <sup>{note.id}</sup> {note.text}
            </li>
          ))}
        </ol>
        {section.cta && (
          <div>
            <CtaButton />
          </div>
        )}
      </div>
    </section>
  );
}
