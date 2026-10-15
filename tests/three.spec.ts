import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __LD_3D_LOADED__?: boolean;
  }
}

const HERO = "section#inicio";

test.describe("Portada 3D", () => {
  test("RF-29 · en escritorio se carga el 3D después del titular y el botón", async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    const html = await (await request.get("/")).text();
    expect(html).toContain("Ningún cliente sin respuesta");
    expect(html).toContain('data-cta="primary"');
    expect(html).not.toContain("<canvas");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator(`${HERO} h1`)).toBeVisible();
    await expect(page.locator(`${HERO} canvas`)).toBeVisible({ timeout: 15000 });
    expect(await page.evaluate(() => window.__LD_3D_LOADED__)).toBe(true);
  });

  test("RF-29 · el elemento más grande pintado (LCP) no es el lienzo 3D", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    await expect(page.locator(`${HERO} canvas`)).toBeVisible({ timeout: 15000 });
    const lcpTag = await page.evaluate(
      () =>
        new Promise<string>((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries() as (PerformanceEntry & { element?: Element })[];
            resolve(entries.at(-1)?.element?.tagName ?? "none");
          }).observe({ type: "largest-contentful-paint", buffered: true });
        }),
    );
    expect(lcpTag).not.toBe("CANVAS");
  });

  test("RF-33 · en móvil se ve la imagen fija y no se descarga nada del 3D", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(`${HERO} [data-hero-still]`)).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(await page.evaluate(() => window.__LD_3D_LOADED__)).toBeUndefined();
  });

  test("RF-33 · con reducir movimiento no se descarga nada del 3D", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(`${HERO} [data-hero-still]`)).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    expect(await page.evaluate(() => window.__LD_3D_LOADED__)).toBeUndefined();
  });

  test("RF-33 · CL-10 · sin soporte 3D se ve la imagen fija sin errores", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        if (type.startsWith("webgl")) return null;
        return (original as (...a: unknown[]) => unknown).call(this, type, ...args);
      } as typeof original;
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator(`${HERO} [data-hero-still]`)).toBeVisible();
    expect(await page.evaluate(() => window.__LD_3D_LOADED__)).toBeUndefined();
    expect(errors).toEqual([]);
  });

  test("RF-33 · sin JavaScript se ve la imagen fija", async ({ browser }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL: testInfo.project.use.baseURL });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator(`${HERO} [data-hero-still]`)).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(0);
    await context.close();
  });
});
