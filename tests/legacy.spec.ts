import { expect, test } from "@playwright/test";

test.describe("Rutas inexistentes", () => {
  test("RF-09 · una dirección inexistente responde 404 y enlaza al HUB", async ({ page }) => {
    const response = await page.goto("/esta-pagina-no-existe");
    expect(response?.status()).toBe(404);
    const homeLink = page.getByRole("link", { name: /volver a la (página de )?inicio|ir a localdigital/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");
  });
});

test.describe("Contenido heredado", () => {
  test("RF-32 · /portfolio responde 404 y ninguna página la enlaza", async ({ page }) => {
    const response = await page.goto("/portfolio");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: /volver a la (página de )?inicio/i })).toHaveAttribute("href", "/");

    await page.goto("/");
    await expect(page.locator('a[href*="portfolio"]')).toHaveCount(0);
  });

  test("RF-31 · la portada no muestra cifras de resultados ni casos de la web anterior", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/\d\s?%/);
    for (const phrase of [
      /casos de éxito/i,
      /ejemplos representativos/i,
      /resultados obtenidos/i,
      /no-shows/i,
      /top 1/i,
      /DentalHub/i,
      /La Piazza/i,
    ]) {
      expect(text).not.toMatch(phrase);
    }
  });
});
