import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { academias } from "../src/content/academias";
import { withoutPilot } from "../src/lib/pilot";
import type { Section } from "../src/content/types";

const plain = (value: unknown) => JSON.stringify(value).replace(/\\u00a0| /g, " ");
const byKind = <K extends Section["kind"]>(kind: K) =>
  academias.sections.find((s) => s.kind === kind) as Extract<Section, { kind: K }>;

test.describe("Contenido de academias", () => {
  test("RF-15 · las secciones siguen el orden de la spec", () => {
    expect(academias.sections.map((s) => s.kind)).toEqual([
      "hero",
      "problem",
      "features",
      "pricing",
      "guarantee",
      "chatDemo",
      "pilot",
      "about",
      "faq",
      "closing",
    ]);
    expect(academias.nav).toBe("minimal");
  });

  test("RF-08 · los titulares coinciden con contenido/academias.md", () => {
    expect(byKind("hero").title).toBe("Septiembre sin 200 WhatsApps sin contestar.");
    expect(byKind("problem").title).toBe("Mientras das clase, otro centro está contestando a tu alumno.");
    expect(byKind("features").title).toBe("Un asistente en tu WhatsApp que conoce tu centro como tú.");
    expect(byKind("pricing").title).toBe("Lo que cuesta, desde el principio.");
    expect(byKind("guarantee").title).toBe("Sin riesgo para tu centro.");
    expect(byKind("chatDemo").title).toBe("Míralo contestar a un alumno.");
    expect(byKind("pilot").title).toBe("Buscamos 3 centros para nuestros primeros casos.");
    expect(byKind("about").title).toBe("Somos Beatriz y Mauri.");
    expect(byKind("closing").title).toBe("Llega a septiembre con el WhatsApp bajo control.");
    expect(byKind("pilot").asks).toHaveLength(3);
    expect(byKind("faq").items).toHaveLength(7);
  });

  test("RF-18 · ejemplos de academia y de autoescuela, cada uno con su etiqueta", () => {
    const tags = (items: { tag?: string }[]) => items.map((i) => i.tag).filter(Boolean);
    expect(tags(byKind("problem").scenes)).toEqual(["Academia", "Autoescuela"]);
    expect(tags(byKind("features").items)).toEqual(["Academia", "Autoescuela"]);
    expect(byKind("chatDemo").chats.map((c) => c.tag)).toEqual(["Academia", "Autoescuela"]);
  });

  test("RF-03 · precios, plazos y garantía salen de los datos comunes", () => {
    const text = plain(academias);
    expect(text).toContain("Instalación: desde 375 €");
    expect(text).toContain("Mantenimiento: 75 €/mes");
    expect(text).toContain("Web desde 449 €, con la ficha de Google Maps incluida.");
    expect(text).toContain("Si en los primeros 60 días no te convence, te devolvemos la instalación.");
    expect(text).toContain("190 € en lugar de 375 €");
    expect(text).toContain("Lo instalamos en 5 días laborables.");
    const source = readFileSync("src/content/academias.ts", "utf8");
    expect(source).not.toMatch(/\b(375|449|190)\b/);
    expect(source).not.toMatch(/\b75 ?€/);
  });

  test("RF-05 · sin plazas, la respuesta de precio deja de mencionar el piloto", () => {
    const sections = withoutPilot(academias.sections, false);
    expect(plain(sections)).not.toContain("190 €");
    expect(sections.some((s) => s.kind === "pilot")).toBe(false);
  });

  test("RF-08 · sin notas internas ni huecos", () => {
    const text = plain(academias);
    expect(text).not.toContain("{nota");
    expect(text).not.toMatch(/\[(X|Y|N|precio)/i);
  });

  test("RNF-08 · sin «yo», «me» ni «escríbeme»", () => {
    const text = plain(academias);
    expect(text).not.toMatch(/\byo\b/i);
    expect(text).not.toMatch(/\bme\b/i);
    expect(text).not.toMatch(/escr[ií]beme/i);
  });

  test("SEO de academias según contenido/academias.md", () => {
    expect(academias.seo.title).toBe("Asistente de WhatsApp para academias y autoescuelas · Local Digital");
    expect(plain(academias.seo.description)).toContain("Desde 375 € + 75 €/mes, sin permanencia.");
  });
});
