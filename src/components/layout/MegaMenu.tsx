import { ChevronDown } from "lucide-react";
import type { MenuGroup } from "@/content/navigation";

/**
 * Menú de escritorio con desplegables (RF-50). Cada desplegable es un <details>: funciona sin
 * JavaScript y con teclado; /js/nav.js añade el cierre automático (D-35). El panel ocupa todo el
 * ancho bajo la cabecera, como en la maqueta.
 */
export function MegaMenu({ menu }: { menu: MenuGroup[] }) {
  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {menu.map((group) =>
          group.items ? (
            <li key={group.label}>
              <details data-menu className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full px-3 text-sm hover:text-blue focus-visible:outline-2 focus-visible:outline-blue [&::-webkit-details-marker]:hidden">
                  {group.label}
                  <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-muted group-open:rotate-180" />
                </summary>
                <div className="absolute inset-x-0 top-full border-y border-line bg-white shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
                  <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-6 py-8">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className={`flex h-full flex-col gap-1.5 rounded-2xl p-5 hover:bg-[#ececf0] ${item.badge ? "bg-tint-green" : "bg-[#f5f5f7]"}`}
                        >
                          {item.badge && (
                            <span className="text-xs font-semibold uppercase tracking-wide text-[#1a7f45]">{item.badge}</span>
                          )}
                          <span className="text-[17px] font-semibold">{item.label}</span>
                          <span className="text-sm text-[#424245]">{item.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ) : (
            <li key={group.label}>
              <a href={group.href} className="flex min-h-11 items-center rounded-full px-3 text-sm hover:text-blue">
                {group.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
