import { academias } from "@/content/academias";
import { ogSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = academias.seo.title;

export default function OpengraphImage() {
  const hero = academias.sections.find((s) => s.kind === "hero");
  return renderOgImage(hero?.kind === "hero" ? hero.title : academias.seo.title, "Para academias y autoescuelas");
}
