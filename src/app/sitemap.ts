import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

const PATHS = ["", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/academias" ? 0.9 : 0.3,
  }));
}
