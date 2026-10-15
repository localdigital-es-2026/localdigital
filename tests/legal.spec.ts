import { expect, test } from "@playwright/test";

const PAGES = ["/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"];

test.describe("Navegación en páginas secundarias", () => {
  for (const path of PAGES) {
    test(`RNF-02 · ${path} tiene menú superior con enlace a la página de inicio`, async ({ page }) => {
      await page.goto(path);
      const home = page.locator("header").getByRole("link", { name: "Local Digital" });
      await expect(home).toBeVisible();
      await expect(home).toHaveAttribute("href", "/");
      await home.click();
      await expect(page).toHaveURL(/\/$/);
    });
  }
});
