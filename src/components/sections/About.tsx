import { TeamIllustration } from "@/components/illustrations/TeamIllustration";
import type { SectionProps } from "./types";

export function About({ section, tone }: SectionProps<"about">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          <h2>{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="text-lg">
              {paragraph}
            </p>
          ))}
          {section.commitments && (
            <ul className="mt-2 flex flex-col gap-2">
              {section.commitments.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> {item.body}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          <TeamIllustration />
        </div>
      </div>
    </section>
  );
}
