import { site } from "@/content/site";
import { demoWhatsappUrl } from "@/lib/links";
import { CtaButton } from "@/components/layout/CtaButton";
import { SecondaryButton } from "@/components/layout/SecondaryButton";
import { HeroStill } from "@/components/illustrations/HeroStill";
import { Hero3DSlot } from "@/components/three/Hero3DSlot";
import type { SectionProps } from "./types";

/** Una frase por línea, como los titulares de apple.com/services (RF-37). */
function sentences(title: string): string[] {
  return title.split(/(?<=\.)\s+/);
}

export function Hero({ section, tone }: SectionProps<"hero">) {
  const demoUrl = demoWhatsappUrl(site);
  return (
    <section id={section.id} data-tone={tone} className="px-6 pb-16 pt-14 md:pt-24">
      {/* Una sola columna centrada, como apple.com/careers (v1.2). */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">{section.eyebrow}</p>
          <h1>
            {sentences(section.title).map((sentence, index) => (
              <span key={sentence} className="block">
                {index > 0 && " "}
                {sentence}
              </span>
            ))}
          </h1>
          <p className="max-w-2xl text-xl leading-snug text-muted md:text-[21px]">{section.subtitle}</p>
          <div className="flex flex-col items-center gap-3">
            <CtaButton />
            <p className="text-sm text-muted">{section.ctaNote}</p>
            {demoUrl && section.demoLinkText && (
              <SecondaryButton href={demoUrl}>
                {section.demoLinkText}
              </SecondaryButton>
            )}
          </div>
        </div>
        <div className="flex justify-center">{section.visual === "3d" ? <Hero3DSlot /> : <HeroStill />}</div>
      </div>
    </section>
  );
}
