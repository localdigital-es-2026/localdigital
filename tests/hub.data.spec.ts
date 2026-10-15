import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { hub } from "../src/content/hub";
import { hubMenu } from "../src/content/navigation";
import type { Section } from "../src/content/types";

const plain = (value: unknown) => JSON.stringify(value).replace(/\\u00a0| /g, " ");
const byKind = <K extends Section["kind"]>(kind: K) =>
  hub.sections.find((s) => s.kind === kind) as Extract<Section, { kind: K }>;

test.describe("Contenido del HUB", () => {
  test("RF-10 · las secciones siguen el orden de la spec", () => {
    expect(hub.sections.map((s) => s.kind)).toEqual([
      "hero",
      "problem",
      "marquee",
      "services",
      "steps",
      "pricing",
      "pilot",
      "sectors",
      "about",
      "faq",
      "closing",
    ]);
  });

  test("RF-08 · los titulares coinciden con contenido/hub.md", () => {
    expect(byKind("hero").title).toBe("Ningún cliente sin respuesta. Ni a las 11 de la noche.");
    expect(byKind("problem").title).toBe("Cada mensaje sin contestar es un cliente que pregunta en otro sitio.");
    expect(byKind("services").title).toBe("Todo lo que necesitas para no perder clientes.");
    expect(byKind("services").blocks.map((b) => [b.name, b.title])).toEqual([
      ["Asistente de WhatsApp", "Contesta por ti, a cualquier hora."],
      ["Web para tu negocio", "Clara, rápida en el móvil y con el WhatsApp a un toque."],
      ["Ficha de Google Maps", "Sal cuando alguien de tu zona busca lo que ofreces."],
    ]);
    expect(byKind("marquee").questions).toEqual([
      "¿Cuánto cuesta?",
      "¿Abrís el sábado?",
      "¿Queda plaza para mañana?",
      "¿Dónde estáis?",
      "¿Aceptáis tarjeta?",
      "¿Puedo cambiar mi cita?",
      "¿Hacéis presupuesto sin compromiso?",
      "¿Tenéis aparcamiento cerca?",
    ]);
    expect(byKind("steps").title).toBe("Tres pasos. Tú sigues con tu negocio.");
    expect(byKind("pricing").title).toBe("Precios claros desde el principio.");
    expect(byKind("pilot").title).toBe("Instalación a mitad de precio para nuestros 3 primeros negocios.");
    expect(byKind("about").title).toBe("Somos Beatriz y Mauri.");
    expect(byKind("faq").title).toBe("Preguntas frecuentes");
    expect(byKind("closing").title).toBe("Mira cómo contestaría tu negocio.");
    expect(byKind("problem").scenes).toHaveLength(3);
    expect(byKind("services").blocks[0].featured?.features).toHaveLength(4);
    expect(byKind("faq").items.map((i) => i.q)).toEqual([
      "¿Cuánto cuesta?",
      "¿Esto sirve para mi negocio?",
      "Sois nuevos. ¿Por qué debería confiar?",
      "¿Y si el asistente se equivoca?",
      "¿Qué pasa con los datos de mis clientes?",
      "¿Puedo cambiar lo que contesta?",
      "¿Tengo que saber de tecnología?",
      "¿Necesito WhatsApp Business?",
      "¿Qué pasa si quiero dejarlo?",
    ]);
  });

  test("RF-03 · los textos con precios y plazos usan los datos comunes", () => {
    const text = plain(hub);
    expect(text).toContain("La instalación del asistente empieza en 375 € y el mantenimiento es de 75 €/mes (IVA no incluido), sin permanencia.");
    expect(text).toContain("190 € en lugar de 375 €");
    expect(text).toContain("Lo instalamos en 5 días laborables.");
    expect(text).toContain("lo actualizamos en menos de 24 horas laborables");
    expect(byKind("services").blocks.map((b) => b.price.replace(/ /g, " "))).toEqual([
      "Desde 375 € + 75 €/mes",
      "Desde 449 €",
      "Incluida con la web · suelta 99 €",
    ]);
  });

  test("RNF-07 · hub.ts no repite precios ni plazos escritos a mano", () => {
    const source = readFileSync("src/content/hub.ts", "utf8");
    expect(source).not.toMatch(/\b(375|449|190|99)\b/);
    expect(source).not.toMatch(/\b75 ?€/);
  });

  test("RF-08 · ningún texto contiene notas internas ni huecos", () => {
    const text = plain(hub);
    expect(text).not.toContain("{nota");
    expect(text).not.toMatch(/\[(X|Y|N)\b/);
  });

  test("RNF-08 · tuteo y primera persona del plural: sin «yo», «me» ni «escríbeme»", () => {
    const text = plain(hub);
    expect(text).not.toMatch(/\byo\b/i);
    expect(text).not.toMatch(/\bme\b/i);
    expect(text).not.toMatch(/escr[ií]beme/i);
  });

  test("RF-50 · el menú tiene sus cinco cabeceras y cada ancla existe en la portada", () => {
    expect(hubMenu.map((group) => group.label)).toEqual(["Servicios", "Sectores", "Precios", "Cómo trabajamos", "Nosotros"]);
    const ids = hub.sections.map((s) => s.id);
    const hrefs = hubMenu.flatMap((group) => (group.items ?? []).map((item) => item.href).concat(group.href ?? []));
    for (const href of hrefs) {
      if (href.startsWith("#")) expect(ids).toContain(href.slice(1));
      else expect(href).toBe("/academias");
    }
  });

  test("SEO del HUB según contenido/hub.md", () => {
    expect(hub.seo.title).toBe("Local Digital · Asistentes de WhatsApp para negocios locales");
    expect(hub.seo.description).toContain("Reserva una demo gratis de 15 minutos.");
  });
});
