import { ChevronDown, Menu, X } from "lucide-react";
import type { MenuGroup } from "@/content/navigation";
import { CtaButton } from "./CtaButton";

/**
 * Menú móvil a pantalla completa (RF-51). Funciona sin JavaScript (<details>); /js/nav.js lo cierra
 * al pulsar un enlace o con Escape y bloquea el desplazamiento del fondo mientras está abierto.
 */
export function MobileMenu({ menu }: { menu: MenuGroup[] }) {
  return (
    <details data-mobile-menu className="group/menu lg:hidden">
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-blue [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" className="h-6 w-6 group-open/menu:hidden" />
        <X aria-hidden="true" className="hidden h-6 w-6 group-open/menu:block" />
        <span className="sr-only group-open/menu:hidden">Abrir menú</span>
        <span className="sr-only hidden group-open/menu:inline">Cerrar menú</span>
      </summary>
      <div className="fixed inset-x-0 bottom-0 top-[61px] overflow-y-auto bg-white px-6 pb-10">
        <nav aria-label="Principal">
          <ul className="flex flex-col">
            {menu.map((group) =>
              group.items ? (
                <li key={group.label} className="border-b border-line">
                  <details className="group/item">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between py-4 text-[28px] font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
                      {group.label}
                      <ChevronDown aria-hidden="true" className="h-5 w-5 text-muted group-open/item:rotate-180" />
                    </summary>
                    <ul className="flex flex-col pb-4">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <a href={item.href} className="flex min-h-11 items-center gap-2 py-2 text-[19px]">
                            {item.label}
                            {item.badge && (
                              <span className="rounded-full bg-tint-green px-2 py-0.5 text-xs font-semibold text-[#1a7f45]">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={group.label} className="border-b border-line">
                  <a href={group.href} className="flex min-h-11 items-center py-4 text-[28px] font-semibold tracking-tight">
                    {group.label}
                  </a>
                </li>
              ),
            )}
          </ul>
          <CtaButton className="mt-8 w-full" />
        </nav>
      </div>
    </details>
  );
}
