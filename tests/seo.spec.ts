import { expect, test } from "@playwright/test";
import { academias } from "../src/content/academias";
import { hub } from "../src/content/hub";

const SALES_PAGES = [
  { path: "/", seo: hub.seo },
  { path: "/academias", seo: academias.seo },
];
const ALL_PAGES = ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"];

function pngSize(buffer: Buffer): { width: number; height: number } {
  expect(buffer.subarray(1, 4).toString("ascii")).toBe("PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test.describe("Buscadores y redes", () => {
  for (const { path, seo } of SALES_PAGES) {
    test(`RF-21 · ${path} tiene título, descripción e imagen para redes de 1200×630`, async ({ page, request }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(seo.title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", seo.description);
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(ogImage).toBeTruthy();
      const imagePath = new URL(ogImage!).pathname;
      const response = await request.get(imagePath);
      expect(response.status()).toBe(200);
      expect(pngSize(await response.body())).toEqual({ width: 1200, height: 630 });
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", seo.title);
    });
  }

  for (const path of ALL_PAGES) {
    test(`RF-21 · ${path} tiene título y descripción propios`, async ({ page }) => {
      await page.goto(path);
      expect((await page.title()).length).toBeGreaterThan(10);
      expect((await page.locator('meta[name="description"]').getAttribute("content"))?.length ?? 0).toBeGreaterThan(30);
    });
  }

  test("RF-22 · el mapa del sitio lista las cinco direcciones y robots lo referencia", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]).sort();
    expect(locs).toEqual(
      [
        "https://www.localdigital.es/",
        "https://www.localdigital.es/academias",
        "https://www.localdigital.es/aviso-legal",
        "https://www.localdigital.es/politica-de-cookies",
        "https://www.localdigital.es/politica-de-privacidad",
      ].sort(),
    );
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap: https://www.localdigital.es/sitemap.xml");
  });

  test("RF-23 · datos estructurados del HUB válidos y con imagen existente", async ({ page, request }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw!);
    expect(data["@type"]).toBe("LocalBusiness");
    expect(data.name).toBe("Local Digital");
    expect(data.url).toBe("https://www.localdigital.es/");
    expect(data.telephone).toBe("+34603038050");
    expect(data.description).toMatch(/WhatsApp/);
    const response = await request.get(new URL(data.image).pathname);
    expect(response.status()).toBe(200);
  });
});

test.describe("Contexto para asistentes de IA", () => {
  test("RF-24 · llms.txt describe el asistente, academias, precios y un único teléfono", async ({ request }) => {
    const response = await request.get("/llms.txt");
    expect(response.status()).toBe(200);
    const text = (await response.text()).replace(/ /g, " ");
    expect(text).toMatch(/asistente de WhatsApp/i);
    expect(text).toMatch(/academias/i);
    expect(text).toContain("https://www.localdigital.es/academias");
    expect(text).toContain("375 €");
    expect(text).toContain("75 €/mes");
    const phones = [...text.matchAll(/\+?\d{2}[\d ]{7,}\d/g)].map((m) => m[0].trim());
    expect(phones.length).toBeGreaterThan(0);
    for (const phone of phones) expect(phone).toBe("+34 603 03 80 50");
  });
});
