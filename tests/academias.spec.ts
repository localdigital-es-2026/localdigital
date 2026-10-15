import { expect, test } from "@playwright/test";
import { academias } from "../src/content/academias";
import type { Section } from "../src/content/types";

const byKind = <K extends Section["kind"]>(kind: K) =>
  academias.sections.find((s) => s.kind === kind) as Extract<Section, { kind: K }>;

test.describe("Academias · demo y ejemplos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/academias");
  });

  test("RF-17 · dos conversaciones con aspecto de chat y etiqueta «Ejemplo»", async ({ page }) => {
    const section = page.locator(`section#${byKind("chatDemo").id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(byKind("chatDemo").title);
    const chats = section.locator("[data-chat]");
    await expect(chats).toHaveCount(2);
    for (const chat of await chats.all()) {
      await expect(chat.getByText("Ejemplo", { exact: true })).toBeVisible();
    }
  });

  test("RF-18 · etiquetas «Academia» y «Autoescuela» en dolor, solución y demo", async ({ page }) => {
    for (const kind of ["problem", "features", "chatDemo"] as const) {
      const section = page.locator(`section#${byKind(kind).id}`);
      await expect(section.getByText("Academia", { exact: true })).toBeVisible();
      await expect(section.getByText("Autoescuela", { exact: true })).toBeVisible();
    }
  });

  test("RF-18 · los chats van lado a lado en escritorio y apilados en móvil", async ({ page }, testInfo) => {
    const chats = page.locator(`section#${byKind("chatDemo").id} [data-chat]`);
    const first = (await chats.nth(0).boundingBox())!;
    const second = (await chats.nth(1).boundingBox())!;
    if (testInfo.project.name === "desktop-chrome") {
      expect(Math.abs(first.y - second.y)).toBeLessThan(2);
      expect(second.x).toBeGreaterThan(first.x + first.width - 1);
    } else {
      expect(second.y).toBeGreaterThanOrEqual(first.y + first.height - 1);
    }
  });
});

test.describe("Academias · página", () => {
  test("RF-15 · las secciones aparecen en el orden de la spec", async ({ page }) => {
    await page.goto("/academias");
    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(academias.sections.map((s) => s.id));
  });

  test("RF-16 · el menú solo tiene el logo (al HUB), sin botón (v1.6)", async ({ page }) => {
    await page.goto("/academias");
    const header = page.locator("header");
    await expect(header.getByRole("link")).toHaveCount(1);
    await expect(header.getByRole("link", { name: "Local Digital" })).toHaveAttribute("href", "/");
    await expect(header.locator("[data-cta]")).toHaveCount(0);
  });

  for (const path of ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"]) {
    test(`RF-11 · RF-16 · ninguna cabecera lleva botón de reserva: ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("header [data-cta]")).toHaveCount(0);
    });
  }

  test("RF-19 · el pie tiene «Volver a localdigital.es» hacia el HUB", async ({ page }) => {
    await page.goto("/academias");
    await expect(page.locator("footer").getByRole("link", { name: /Volver a localdigital\.es/ })).toHaveAttribute("href", "/");
  });

  test("RF-15 · garantía con sus tres puntos", async ({ page }) => {
    await page.goto("/academias");
    const guarantee = byKind("guarantee");
    const section = page.locator(`section#${guarantee.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(guarantee.title);
    for (const point of guarantee.points) await expect(section.getByText(point.title)).toBeVisible();
  });
});

test.describe("Coherencia entre páginas", () => {
  test("RF-01 · un único estilo de botón principal en / y /academias", async ({ page }) => {
    const styles = new Set<string>();
    for (const path of ["/", "/academias"]) {
      await page.goto(path);
      for (const cta of await page.locator("[data-cta='primary']").all()) {
        await expect(cta).toHaveText("Reserva una demo de 15 min");
        styles.add(await cta.evaluate((el) => {
          const s = getComputedStyle(el);
          // v1.5: los colores dependen del fondo (RF-46, CL-13); la forma y la letra son siempre las mismas.
          return `${s.borderRadius}|${s.fontWeight}|${s.fontSize}|${s.paddingLeft}|${s.borderTopWidth}`;
        }));
      }
    }
    expect(styles.size).toBe(1);
  });

  test("RF-03 · RF-04 · precios y plazas iguales en / y /academias", async ({ page }) => {
    const read = async (path: string) => {
      await page.goto(path);
      const text = (await page.locator("main").innerText()).replace(/ /g, " ");
      return {
        setup: text.includes("desde 375 €"),
        monthly: text.includes("75 €/mes"),
        web: /449 €/.test(text),
        pilot: text.includes("190 € en lugar de 375 €"),
        seats: text.includes("Quedan 3 plazas."),
        vat: text.includes("IVA no incluido"),
      };
    };
    const hubValues = await read("/");
    const sectorValues = await read("/academias");
    expect(hubValues).toEqual({ setup: true, monthly: true, web: true, pilot: true, seats: true, vat: true });
    expect(sectorValues).toEqual(hubValues);
  });
});
