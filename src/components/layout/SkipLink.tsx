/** Primer elemento enfocable: salta el menú y va al contenido principal (RNF-02). */
export function SkipLink() {
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-background"
    >
      Saltar al contenido
    </a>
  );
}
