import Link from "next/link";
import { site } from "@/content/site";
import type { NavLink } from "@/content/types";
import { Logo } from "@/components/brand/Logo";
import { CtaButton } from "./CtaButton";

/**
 * Menú del HUB (RF-11). En escritorio, enlaces en línea; por debajo de 768 px,
 * plegados en un <details> que funciona sin JavaScript y con teclado (RF-13, D-02).
 * Un único botón principal en la cabecera: en móvil se muestra al abrir el menú.
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
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 px-6 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 md:flex-nowrap">
        <Link href="/" aria-label={site.name} className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">{items}</ul>
        </nav>

        <details className="peer md:hidden">
          <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink px-4 font-semibold">
            Menú
          </summary>
          <nav aria-label="Principal" className="absolute inset-x-0 top-full border-b border-line bg-background px-6 py-4">
            <ul className="flex flex-col">{items}</ul>
          </nav>
        </details>

        <div className="hidden w-full peer-open:block md:block md:w-auto">
          <CtaButton className="w-full md:w-auto" />
        </div>
      </div>
    </header>
  );
}
