import type { Metadata } from "next";
import { site } from "@/content/site";
import type { PageContent } from "@/content/types";

/** Metadatos de una página de venta a partir de su contenido (RF-21). */
export function pageMetadata(page: PageContent): Metadata {
  const url = page.slug ? `/${page.slug}` : "/";
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url,
      siteName: site.name,
      locale: "es_ES",
      type: "website",
    },
  };
}
