import Footer from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { LegalPage } from "@/content/legal";

/** Plantilla común de las páginas legales (RF-20). */
export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <>
      <SiteHeader variant="legal" />
      <main id="contenido" className="px-6 py-16">
        <article className="mx-auto flex max-w-3xl flex-col gap-10">
          <header className="flex flex-col gap-3">
            <h1>{page.title}</h1>
            <p className="text-sm text-muted">Última actualización: {page.updated}</p>
          </header>
          {page.sections.map((section) => (
            <section key={section.title} className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="flex list-disc flex-col gap-2 pl-6">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>
      <Footer />
    </>
  );
}
