import { Check } from "lucide-react";
import { CtaButton } from "@/components/layout/CtaButton";
import { TagPill } from "./TagPill";
import type { SectionProps } from "./types";

export function Features({ section, tone }: SectionProps<"features">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {section.eyebrow && <p className="text-sm font-semibold uppercase tracking-wide">{section.eyebrow}</p>}
        <h2>{section.title}</h2>
        <p className="text-lg">{section.intro}</p>
        <ul className="grid gap-4 md:grid-cols-2">
          {section.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-secondary" />
              <p>
                {item.tag && (
                  <>
                    <TagPill tag={item.tag} />{" "}
                  </>
                )}
                <strong>{item.title}</strong> {item.body}
              </p>
            </li>
          ))}
        </ul>
        {section.control && (
          <div className="rounded-2xl bg-surface p-6">
            <p className="font-semibold">{section.control.title}</p>
            <p>{section.control.body}</p>
          </div>
        )}
        {section.benefits && (
          <div className="rounded-2xl bg-surface p-6">
            <p className="font-semibold">{section.benefits.title}</p>
            <ul className="mt-2 list-disc pl-6">
              {section.benefits.items.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        {section.cta && (
          <div>
            <CtaButton />
          </div>
        )}
      </div>
    </section>
  );
}
