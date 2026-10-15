import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";

/** Menú de landings, páginas legales y 404: solo el logo, que lleva al HUB (RF-16, v1.6). Cabecera negra (RF-45). */
export function NavMinimal() {
  return (
    <header data-tone="dark" className="sticky top-0 z-40 bg-surface px-6 py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <Link href="/" aria-label={site.name} className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
