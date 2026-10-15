import type { SiteData } from "./types";

// Única fuente de precios, condiciones, contacto y datos legales (RNF-07).
// Cambiar un valor aquí lo cambia en todas las páginas.
export const site: SiteData = {
  name: "Local Digital",
  url: "https://www.localdigital.es",
  bookingUrl: "https://calendly.com/localdigital-es",
  demoWhatsapp: undefined,
  phone: "+34 603 03 80 50",
  email: "localdigital.es@gmail.com",
  prices: {
    assistantSetup: 375,
    assistantMonthly: 75,
    web: 449,
    mapsStandalone: 99,
    pilotSetup: 190,
  },
  conditions: {
    vat: "IVA no incluido",
    commitment: "Sin permanencia",
    guarantee: "Si en los primeros 60 días no te convence, te devolvemos la instalación.",
    installDays: 5,
    updateHours: 24,
  },
  pilot: { total: 3, remaining: 3 },
  // Titular de la web (aviso legal, RF-20). Datos facilitados el 2026-10-15 (P-07).
  owner: {
    fullName: "Beatriz Palomo del Pozo",
    nif: "11847771-B",
    address: "C. Cercedilla, 7, Loc 2, 28400 Collado Villalba, Madrid",
    email: "localdigital.es@gmail.com",
  },
  retention: { leadsMonths: 12, mercantileYears: 6, fiscalYears: 4 },
  activeSectors: [
    {
      slug: "academias",
      title: "¿Tienes una academia o una autoescuela?",
      summary:
        "Hemos preparado una versión pensada para ti: matrículas, horarios, plazas y temporada de septiembre.",
      linkText: "Ver la solución para academias",
    },
  ],
};
