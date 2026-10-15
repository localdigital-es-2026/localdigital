import { TeamIllustration } from "@/components/illustrations/TeamIllustration";
import type { SectionProps } from "./types";

/** Quiénes somos (RF-57): texto breve, tres compromisos en tarjetas y la ilustración hasta tener foto (P-14). */
export function About({ section, tone }: SectionProps<"about">) {
  return (
    <section id={section.id} data-tone={tone} className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[2fr_3fr]">
        <div className="flex justify-center">
          <TeamIllustration />
        </div>
        <div className="flex flex-col gap-5">
          <h2>{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="text-lg text-[#424245] md:text-xl">
              {paragraph}
            </p>
          ))}
          {section.commitments && (
            <ul className="grid gap-3 sm:grid-cols-3">
              {section.commitments.map((item) => (
                <li key={item.title} data-commitment className="flex flex-col gap-1 rounded-2xl bg-background p-4">
                  <strong className="text-[15px]">{item.title}</strong>
                  <span className="text-sm text-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
