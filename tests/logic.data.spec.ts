import { expect, test } from "@playwright/test";
import { formatEuros, formatMonthly } from "../src/lib/format";
import { isPilotVisible, withoutPilot } from "../src/lib/pilot";
import { demoWhatsappUrl, externalLinkProps, whatsappUrl } from "../src/lib/links";
import { site } from "../src/content/site";
import type { Section } from "../src/content/types";

const NBSP = " ";

test.describe("Formato de precios", () => {
  test("RF-03 · los importes se muestran como «375 €» y «75 €/mes»", () => {
    expect(formatEuros(375)).toBe(`375${NBSP}€`);
    expect(formatEuros(449)).toBe(`449${NBSP}€`);
    expect(formatMonthly(75)).toBe(`75${NBSP}€/mes`);
  });
});

test.describe("Programa piloto", () => {
  const sections: Section[] = [
    { kind: "closing", id: "cierre", title: "Cierre", body: "Texto" },
    { kind: "pilot", id: "piloto", eyebrow: "Plazas", title: "Piloto", body: "Texto", asksIntro: "", asks: [] },
    {
      kind: "faq",
      id: "faq",
      title: "Preguntas",
      items: [
        { q: "¿Cuánto cuesta?", a: "Desde 375 €.", pilotOnly: false },
        { q: "¿Y el piloto?", a: "190 €.", pilotOnly: true },
      ],
    },
  ];

  test("RF-04 · con plazas libres el piloto se muestra", () => {
    expect(isPilotVisible({ total: 3, remaining: 3 })).toBe(true);
    expect(isPilotVisible({ total: 3, remaining: 1 })).toBe(true);
    expect(withoutPilot(sections, true)).toEqual(sections);
  });

  test("RF-05 · con 0 plazas se ocultan el bloque y las respuestas del piloto", () => {
    expect(isPilotVisible({ total: 3, remaining: 0 })).toBe(false);
    const result = withoutPilot(sections, false);
    expect(result.map((s) => s.kind)).toEqual(["closing", "faq"]);
    const faq = result.find((s) => s.kind === "faq");
    expect(faq && faq.kind === "faq" ? faq.items.map((i) => i.q) : []).toEqual(["¿Cuánto cuesta?"]);
  });
});

test.describe("Enlaces", () => {
  test("RF-27 · los enlaces externos abren pestaña nueva sin acceso a la página de origen", () => {
    expect(externalLinkProps).toEqual({ target: "_blank", rel: "noopener noreferrer" });
  });

  test("RF-02 · el enlace de WhatsApp usa el número sin espacios ni prefijo +", () => {
    expect(whatsappUrl("+34 603 03 80 50")).toBe("https://wa.me/34603038050");
    expect(whatsappUrl("+34 603 03 80 50", "Hola, quiero probarlo")).toBe(
      "https://wa.me/34603038050?text=Hola%2C%20quiero%20probarlo",
    );
  });

  test("RF-34 · sin número del asistente de ejemplo no hay enlace de prueba", () => {
    expect(demoWhatsappUrl({ ...site, demoWhatsapp: undefined })).toBeUndefined();
    expect(demoWhatsappUrl({ ...site, demoWhatsapp: "  " })).toBeUndefined();
    expect(demoWhatsappUrl({ ...site, demoWhatsapp: "+34 600 00 00 00" })).toBe("https://wa.me/34600000000");
  });
});
