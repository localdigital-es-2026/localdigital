import { hub } from "@/content/hub";
import { ogSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = hub.seo.title;

export default function OpengraphImage() {
  const hero = hub.sections.find((s) => s.kind === "hero");
  return renderOgImage(hero?.kind === "hero" ? hero.title : hub.seo.title, "Asistentes de WhatsApp para negocios locales");
}
