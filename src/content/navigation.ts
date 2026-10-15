import { site } from "./site";

// Menú del HUB (RF-50, contenido/hub.md · v1.8 §1). Los enlaces son anclas de la portada o páginas de sector.

export interface MenuItem {
  label: string;
  description: string;
  href: string;
  /** Etiqueta destacada (p. ej. «el principal»). */
  badge?: string;
  /** Solo mientras queden plazas del piloto (RF-05). */
  pilotOnly?: boolean;
}

export interface MenuGroup {
  label: string;
  /** Enlace directo (cabecera sin desplegable). */
  href?: string;
  items?: MenuItem[];
}

export const hubMenu: MenuGroup[] = [
  {
    label: "Servicios",
    items: [
      { label: "Asistente de WhatsApp", description: "Contesta por ti, a cualquier hora.", href: "#servicios", badge: "el principal" },
      { label: "Web para tu negocio", description: "Clara, rápida en el móvil y con el WhatsApp a un toque.", href: "#servicios" },
      { label: "Ficha de Google Maps", description: "Sal cuando alguien de tu zona busca lo que ofreces.", href: "#servicios" },
    ],
  },
  {
    label: "Sectores",
    items: site.activeSectors.map((sector) => ({
      label: "Academias y autoescuelas",
      description: "Matrículas, horarios y la temporada de septiembre.",
      href: `/${sector.slug}`,
    })),
  },
  { label: "Precios", href: "#precios" },
  {
    label: "Cómo trabajamos",
    items: [
      { label: "Cómo funciona", description: `Tres pasos, ${site.conditions.installDays} días.`, href: "#proceso" },
      { label: "Programa piloto", description: `${site.pilot.total} plazas a mitad de precio.`, href: "#piloto", pilotOnly: true },
      { label: "Tus datos", description: "RGPD y contrato de tratamiento.", href: "#faq" },
      { label: "Preguntas frecuentes", description: "Precio, permanencia, errores.", href: "#faq" },
    ],
  },
  { label: "Nosotros", href: "#sobre-nosotros" },
];

/** Quita las entradas del piloto cuando no quedan plazas (RF-05). */
export function visibleMenu(menu: MenuGroup[], pilotVisible: boolean): MenuGroup[] {
  if (pilotVisible) return menu;
  return menu.map((group) => (group.items ? { ...group, items: group.items.filter((item) => !item.pilotOnly) } : group));
}
