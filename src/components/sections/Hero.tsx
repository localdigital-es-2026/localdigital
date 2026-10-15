import { site } from "@/content/site";
import { demoWhatsappUrl } from "@/lib/links";
import { CtaButton } from "@/components/layout/CtaButton";
import { SecondaryButton } from "@/components/layout/SecondaryButton";
import { PhoneChat } from "@/components/illustrations/PhoneChat";
import type { SectionProps } from "./types";

/** Una frase por línea, como los titulares de apple.com/services (RF-37). */
function sentences(title: string): string[] {
  return title.split(/(?<=\.)\s+/);
}

/** Portada centrada con dos botones y el producto dibujado asomando por abajo (RF-52, v1.8). */
export function Hero({ section, tone }: SectionProps<"hero">) {
  const demoUrl = demoWhatsappUrl(site);
  return (
    <section id={section.id} data-tone={tone} className="overflow-hidden px-6 pt-14 md:pt-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">{section.eyebrow}</p>
        <h1>
          {sentences(section.title).map((sentence, index) => (
            <span key={sentence} className="block">
              {index > 0 && " "}
              {sentence}
            </span>
          ))}
        </h1>
        <p className="max-w-2xl text-xl leading-snug text-[#424245] md:text-2xl">{section.subtitle}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <CtaButton />
          {section.secondaryCta && <SecondaryButton href={section.secondaryCta.href}>{section.secondaryCta.label}</SecondaryButton>}
        </div>
        <p className="text-sm text-muted">{section.ctaNote}</p>
        {demoUrl && section.demoLinkText && <SecondaryButton href={demoUrl}>{section.demoLinkText}</SecondaryButton>}
      </div>
      {section.chat && (
        <div className="mx-auto mt-12 max-w-5xl">
          <PhoneChat chat={section.chat} />
        </div>
      )}
    </section>
  );
}
