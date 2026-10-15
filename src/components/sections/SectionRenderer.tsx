import { site } from "@/content/site";
import type { Section, Tone } from "@/content/types";
import { isPilotVisible, withoutPilot } from "@/lib/pilot";
import { About } from "./About";
import { ChatDemo } from "./ChatDemo";
import { Closing } from "./Closing";
import { DataPrivacy } from "./DataPrivacy";
import { Faq } from "./Faq";
import { Features } from "./Features";
import { Guarantee } from "./Guarantee";
import { Hero } from "./Hero";
import { Pilot } from "./Pilot";
import { Pricing } from "./Pricing";
import { Problem } from "./Problem";
import { QuestionMarquee } from "./QuestionMarquee";
import { Sectors } from "./Sectors";
import { Services } from "./Services";
import { Steps } from "./Steps";

/** Tonos de fondo: impacto en oscuro y el resto alternando blanco y gris (RF-44, D-23). */
export function sectionTones(sections: Section[], darkSections: string[]): Tone[] {
  let nextLight: Tone = "white";
  return sections.map((section) => {
    if (darkSections.includes(section.id)) {
      nextLight = "white";
      return "dark";
    }
    const tone = nextLight;
    nextLight = tone === "white" ? "gray" : "white";
    return tone;
  });
}

/** Elige el componente de cada sección; las páginas solo pasan su lista (capa de páginas). */
export function SectionRenderer({ sections, darkSections = [] }: { sections: Section[]; darkSections?: string[] }) {
  const visible = withoutPilot(sections, isPilotVisible(site.pilot));
  const tones = sectionTones(visible, darkSections);
  return (
    <>
      {visible.map((section, index) => {
        const tone = tones[index];
        switch (section.kind) {
          case "hero":
            return <Hero key={section.id} section={section} tone={tone} />;
          case "problem":
            return <Problem key={section.id} section={section} tone={tone} />;
          case "features":
            return <Features key={section.id} section={section} tone={tone} />;
          case "services":
            return <Services key={section.id} section={section} tone={tone} />;
          case "marquee":
            return <QuestionMarquee key={section.id} section={section} tone={tone} />;
          case "steps":
            return <Steps key={section.id} section={section} tone={tone} />;
          case "pricing":
            return <Pricing key={section.id} section={section} tone={tone} />;
          case "guarantee":
            return <Guarantee key={section.id} section={section} tone={tone} />;
          case "pilot":
            return <Pilot key={section.id} section={section} tone={tone} />;
          case "sectors":
            return <Sectors key={section.id} section={section} tone={tone} />;
          case "about":
            return <About key={section.id} section={section} tone={tone} />;
          case "privacy":
            return <DataPrivacy key={section.id} section={section} tone={tone} />;
          case "faq":
            return <Faq key={section.id} section={section} tone={tone} />;
          case "closing":
            return <Closing key={section.id} section={section} tone={tone} />;
          case "chatDemo":
            return <ChatDemo key={section.id} section={section} tone={tone} />;
        }
      })}
    </>
  );
}
