import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/content/site";

const LEGAL_LINKS = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/politica-de-privacidad", label: "Política de privacidad" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
];

function telHref(phone: string): string {
  return `tel:+${phone.replace(/\D/g, "")}`;
}

/** `backToHub` añade «Volver a localdigital.es» en las landings de sector (RF-19). */
export default function Footer({ backToHub = false }: { backToHub?: boolean }) {
  return (
    <footer className="border-t border-line bg-surface px-6 py-10 text-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p>Asistentes de WhatsApp para negocios locales</p>
          {backToHub && (
            <Link href="/" className="mt-2 inline-flex min-h-11 items-center font-semibold underline">
              ← Volver a localdigital.es
            </Link>
          )}
        </div>
        <ul className="flex flex-col">
          <li>
            <a className="inline-flex min-h-11 items-center underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </li>
          <li>
            <a className="inline-flex min-h-11 items-center underline" href={telHref(site.phone)}>
              {site.phone}
            </a>
          </li>
        </ul>
        <nav aria-label="Información legal">
          <ul className="flex flex-col">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link className="inline-flex min-h-11 items-center underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-5xl">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
