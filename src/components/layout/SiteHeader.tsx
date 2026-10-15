import { site } from "@/content/site";
import { hubMenu, visibleMenu } from "@/content/navigation";
import { isPilotVisible } from "@/lib/pilot";
import { Logo } from "@/components/brand/Logo";
import { CtaButton } from "./CtaButton";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";

type Variant = "hub" | "landing" | "legal";

/**
 * Cabecera clara en tres zonas: logo · menú · botón (RF-49, v1.8). El HUB lleva el menú completo;
 * las landings, logo y botón (RF-16); las páginas legales y la 404, solo el logo.
 */
export function SiteHeader({ variant }: { variant: Variant }) {
  const menu = visibleMenu(hubMenu, isPilotVisible(site.pilot));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(255,255,255,0.9)]">
      {/* El desenfoque va en una capa aparte: en la propia cabecera haría que el menú móvil
          (position: fixed) se midiera respecto a ella y no ocupara la pantalla (RF-51). */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 backdrop-blur-md" />
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 md:px-6 lg:grid-cols-[1fr_auto_1fr]">
        {/* Enlace normal: desde / con <Link> no volvía arriba (T-42). */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" aria-label={site.name} className="inline-flex min-h-11 items-center justify-self-start">
          <Logo compact={variant === "landing"} />
        </a>
        {variant === "hub" ? <MegaMenu menu={menu} /> : <span aria-hidden="true" className="hidden lg:block" />}
        <div className="flex items-center gap-2 justify-self-end">
          {/* En el HUB, por debajo de 1024 px el botón va dentro del menú móvil (RF-51). */}
          {variant === "landing" && <CtaButton />}
          {variant === "hub" && (
            <span className="hidden lg:block">
              <CtaButton />
            </span>
          )}
          {variant === "hub" && <MobileMenu menu={menu} />}
        </div>
      </div>
      {variant === "hub" && <script src="/js/nav.js" defer />}
    </header>
  );
}
