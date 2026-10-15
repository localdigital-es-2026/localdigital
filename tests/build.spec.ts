import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";

test.describe("Exportación estática", () => {
  test("RNF-05 · la compilación genera páginas estáticas en out/", async ({ page }) => {
    expect(existsSync("out/index.html")).toBe(true);
    expect(existsSync("out/404.html")).toBe(true);
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });
});
