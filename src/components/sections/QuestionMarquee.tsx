import type { SectionProps } from "./types";

/**
 * Cinta de preguntas que contesta el asistente (RF-39, RF-40, D-17, D-18, D-19).
 * Solo CSS: la casilla nativa pausa la animación incluso sin JavaScript;
 * la copia que cierra el bucle queda oculta a lectores de pantalla y al foco.
 * Con «reducir movimiento» se ve como lista estática (estilos en globals.css).
 */
export function QuestionMarquee({ section, tone }: SectionProps<"marquee">) {
  const toggleId = `${section.id}-pausa`;
  const items = (hidden: boolean) =>
    section.questions.map((question) => (
      <li key={`${question}-${hidden}`} className="shrink-0 rounded-full border border-line bg-background px-5 py-2 text-lg">
        {question}
      </li>
    ));

  return (
    <section id={section.id} data-tone={tone} aria-label={section.label} className="ld-marquee px-6 py-8">
      <div className="mx-auto flex max-w-5xl justify-end">
        <input id={toggleId} type="checkbox" className="ld-marquee-toggle peer sr-only" aria-label="Pausar la cinta de preguntas" />
        <label
          htmlFor={toggleId}
          className="ld-marquee-control inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink px-4 text-sm font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
        >
          <span className="ld-when-running">Pausar</span>
          <span className="ld-when-paused">Reanudar</span>
        </label>
      </div>
      <div data-marquee-viewport className="ld-marquee-viewport mt-4 overflow-hidden">
        <div data-marquee-track className="ld-marquee-track flex w-max gap-3">
          <ul className="flex gap-3">{items(false)}</ul>
          <ul className="ld-marquee-copy flex gap-3" aria-hidden="true" inert>
            {items(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}
