import type { Section, Tone } from "@/content/types";

export type SectionProps<K extends Section["kind"]> = { section: Extract<Section, { kind: K }>; tone: Tone };
