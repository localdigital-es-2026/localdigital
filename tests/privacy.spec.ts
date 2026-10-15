import { expect, test } from "@playwright/test";

const PAGES = ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"];

test.describe("Privacidad y terceros", () => {
  for (const path of PAGES) {
    test(`RF-25 · ${path} no instala cookies ni guarda datos en el navegador`, async ({ page, context }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      expect(await context.cookies()).toEqual([]);
      const storage = await page.evaluate(() => ({
        local: window.localStorage.length,
        session: window.sessionStorage.length,
      }));
      expect(storage).toEqual({ local: 0, session: 0 });
    });

    test(`RF-26 · ${path} no hace peticiones a otros dominios`, async ({ page, baseURL }) => {
      const origin = new URL(baseURL!).origin;
      const external: string[] = [];
      page.on("request", (request) => {
        const url = request.url();
        if (!url.startsWith(origin) && !url.startsWith("data:")) external.push(url);
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      expect(external).toEqual([]);
    });
  }
});
