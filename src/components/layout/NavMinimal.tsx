import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { CtaButton } from "./CtaButton";

/** Menú de las landings de sector: solo logo (al HUB) y botón (RF-16). */
export function NavMinimal() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/95 px-6 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <Link href="/" aria-label={site.name} className="inline-flex min-h-11 items-center">
          <Logo compact />
        </Link>
        <CtaButton />
      </div>
    </header>
  );
}
