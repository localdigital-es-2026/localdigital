import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";

const PAGES_WITH_FOOTER = ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"];
const LEGAL_LINKS = [
  { name: "Aviso legal", href: "/aviso-legal" },
  { name: "Política de privacidad", href: "/politica-de-privacidad" },
  { name: "Política de cookies", href: "/politica-de-cookies" },
];

test.describe("Llamada a la acción", () => {
  test("RF-01 · el botón principal dice «Reserva una demo de 15 min» y abre las reservas en pestaña nueva", async ({ page }) => {
    await page.goto("/");
    const ctas = page.locator("[data-cta='primary']");
    expect(await ctas.count()).toBeGreaterThan(0);
    for (const cta of await ctas.all()) {
      await expect(cta).toHaveText("Reserva una demo de 15 min");
      await expect(cta).toHaveAttribute("href", site.bookingUrl);
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});

test.describe("Pie de página", () => {
  for (const path of PAGES_WITH_FOOTER) {
    test(`RF-06 · el pie de ${path} tiene correo, teléfono y los tres enlaces legales`, async ({ page, request }) => {
      await page.goto(path);
      const footer = page.locator("footer");
      await expect(footer.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
      await expect(footer.getByRole("link", { name: site.phone })).toHaveAttribute("href", "tel:+34603038050");
      for (const link of LEGAL_LINKS) {
        await expect(footer.getByRole("link", { name: link.name, exact: true })).toHaveAttribute("href", link.href);
        expect((await request.get(link.href)).status()).toBe(200);
      }
    });
  }
});

test.describe("Enlaces externos", () => {
  for (const path of PAGES_WITH_FOOTER) {
    test(`RF-27 · los enlaces a otros dominios de ${path} abren pestaña nueva sin acceso al origen`, async ({ page, baseURL }) => {
      await page.goto(path);
      const origin = new URL(baseURL!).origin;
      const links = await page.locator("a[href^='http']").evaluateAll((anchors) =>
        anchors.map((a) => ({
          href: a.getAttribute("href")!,
          target: a.getAttribute("target"),
          rel: a.getAttribute("rel") ?? "",
        })),
      );
      for (const link of links.filter((l) => !l.href.startsWith(origin))) {
        expect(link.target, link.href).toBe("_blank");
        expect(link.rel, link.href).toContain("noopener");
        expect(link.rel, link.href).toContain("noreferrer");
      }
    });
  }
});

test.describe("Accesibilidad básica", () => {
  test("RNF-02 · el primer elemento enfocable es «Saltar al contenido» y lleva al contenido principal", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveText("Saltar al contenido");
    await expect(focused).toHaveAttribute("href", "#contenido");
    await expect(page.locator("main#contenido")).toHaveCount(1);
  });
});
