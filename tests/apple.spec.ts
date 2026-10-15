import { expect, test } from "@playwright/test";

test.describe("v1.1 · titular", () => {
  test("RF-37 · el titular del HUB pinta cada frase en su propia línea", async ({ page }) => {
    await page.goto("/");
    const lines = page.locator("section#inicio h1 > span");
    await expect(lines).toHaveCount(2);
    await expect(lines.nth(0)).toHaveText("Ningún cliente sin respuesta.");
    await expect(lines.nth(1)).toHaveText("Ni a las 11 de la noche.");
    const [a, b] = [(await lines.nth(0).boundingBox())!, (await lines.nth(1).boundingBox())!];
    expect(b.y).toBeGreaterThanOrEqual(a.y + a.height - 1);
    await expect(page.locator("h1")).toHaveText("Ningún cliente sin respuesta. Ni a las 11 de la noche.");
  });

  for (const path of ["/", "/academias"]) {
    test(`RF-37 · el titular de ${path} es grande (≥ 48 px escritorio, ≥ 36 px móvil)`, async ({ page }, testInfo) => {
      await page.goto(path);
      const size = await page.locator("h1").evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(size).toBeGreaterThanOrEqual(testInfo.project.name === "mobile" ? 36 : 48);
    });
  }
});

test.describe("v1.1 · notas al pie", () => {
  for (const path of ["/", "/academias"]) {
    test(`RF-41 · en ${path} los precios llevan «¹» enlazado a la nota con las condiciones`, async ({ page }) => {
      await page.goto(path);
      const pricing = page.locator("section#precios");
      const refs1 = pricing.locator("sup a[href='#nota-1']");
      expect(await refs1.count()).toBeGreaterThan(0);
      for (const ref of await refs1.all()) {
        await expect(ref).toHaveText("1");
        await expect(ref).toHaveAccessibleName("Nota 1");
      }
      const priceLines = await pricing.locator("[data-price-line]").all();
      expect(priceLines.length).toBeGreaterThan(0);
      for (const line of priceLines) await expect(line.locator("sup a[href='#nota-1']")).toHaveCount(1);
      const note1 = pricing.locator("li#nota-1");
      await expect(note1).toContainText("IVA no incluido");
      await expect(note1).toContainText("Sin permanencia");
      await refs1.first().click();
      await expect(note1).toBeInViewport();
    });
  }

  test("RF-41 · en el HUB la garantía lleva «²» enlazado a su nota", async ({ page }) => {
    await page.goto("/");
    const pricing = page.locator("section#precios");
    const ref2 = pricing.locator("sup a[href='#nota-2']");
    await expect(ref2).toHaveCount(1);
    await expect(ref2).toHaveAccessibleName("Nota 2");
    await expect(pricing.locator("li#nota-2")).toContainText("Si en los primeros 60 días no te convence, te devolvemos la instalación.");
  });
});
