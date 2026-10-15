import { CtaButton } from "@/components/layout/CtaButton";
import type { SectionProps } from "./types";

export function Closing({ section, tone }: SectionProps<"closing">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2>{section.title}</h2>
        <p className="text-lg">{section.body}</p>
        <CtaButton />
      </div>
    </section>
  );
}
