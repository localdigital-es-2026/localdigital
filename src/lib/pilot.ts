import type { Section, SiteData } from "@/content/types";

export function isPilotVisible(pilot: SiteData["pilot"]): boolean {
  return pilot.remaining > 0;
}

/** Sin plazas, quita el bloque del piloto y las preguntas que solo hablan de él (RF-05). */
export function withoutPilot(sections: Section[], visible: boolean): Section[] {
  if (visible) return sections;
  return sections
    .filter((section) => section.kind !== "pilot")
    .map((section) =>
      section.kind === "faq"
        ? {
            ...section,
            items: section.items
              .filter((item) => !item.pilotOnly)
              .map(({ pilotNote: _pilotNote, ...item }) => item),
          }
        : section,
    );
}
