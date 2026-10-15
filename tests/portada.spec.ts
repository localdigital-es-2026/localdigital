import { readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// RF-47 (v1.7) · Portada solo con texto y botón, sin imagen ni elemento 3D.
test.describe("Portada sin imagen", () => {
  for (const path of ["/", "/academias"]) {
    test(`RF-47 · la portada de ${path} no tiene imagen ni 3D`, async ({ page }) => {
      const scripts: string[] = [];
      page.on("response", async (response) => {
        if (response.request().resourceType() === "script") scripts.push(await response.text());
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const hero = page.locator("section#inicio");
      await expect(hero.locator("h1")).toBeVisible();
      await expect(hero.locator("[data-cta='primary']")).toBeVisible();
      await expect(hero.locator("svg, img, canvas, [data-hero-still]")).toHaveCount(0);
      for (const code of scripts) expect(code).not.toContain("WebGLRenderer");
    });
  }

  test("RF-47 · la compilación no incluye la librería 3D", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const name of ["three", "@react-three/fiber", "@types/three"]) expect(deps[name], name).toBeUndefined();
    const chunks = readdirSync("out/_next/static", { recursive: true, withFileTypes: true }).filter(
      (entry) => entry.isFile() && entry.name.endsWith(".js"),
    );
    expect(chunks.length).toBeGreaterThan(0);
    for (const chunk of chunks) {
      expect(readFileSync(`${chunk.parentPath}/${chunk.name}`, "utf8"), chunk.name).not.toContain("WebGLRenderer");
    }
  });
});
