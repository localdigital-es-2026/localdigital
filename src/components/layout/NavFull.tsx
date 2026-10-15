import { site } from "@/content/site";
import type { NavLink } from "@/content/types";
import { Logo } from "@/components/brand/Logo";

/**
 * Menú del HUB (RF-11). En escritorio, enlaces en línea; por debajo de 768 px,
 * plegados en un <details> que funciona sin JavaScript y con teclado (RF-13, D-02).
 * Sin botón de reserva en la cabecera, como en apple.com (v1.6): está en el contenido.
 * Cabecera negra con el tono oscuro en todas las páginas (RF-45, D-29).
 */
export function NavFull({ links }: { links: NavLink[] }) {
  const items = links.map((link) => (
    <li key={link.href}>
      <a href={link.href} className="inline-flex min-h-11 items-center px-2 text-sm hover:underline">
        {link.label}
      </a>
    </li>
  ));

  return (
    <header data-tone="dark" className="sticky top-0 z-40 bg-surface px-6 py-3">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 md:flex-nowrap">
        {/* Enlace normal, no <Link>: desde / la navegación interna no vuelve arriba; así recarga en el inicio. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label={site.name} className="inline-flex min-h-11 items-center">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">{items}</ul>
        </nav>

        <details className="md:hidden">
          <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink px-4 font-semibold">
            Menú
          </summary>
          <nav aria-label="Principal" className="absolute inset-x-0 top-full border-b border-line bg-surface px-6 py-4">
            <ul className="flex flex-col">{items}</ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
