import { expect, test } from "@playwright/test";

const size = (el: Element) => parseFloat(getComputedStyle(el).fontSize);

test.describe("v1.2 · escala tipográfica", () => {
  for (const path of ["/", "/academias"]) {
    test(`RF-43 · escala de titulares y texto en ${path}`, async ({ page }, testInfo) => {
      await page.goto(path);
      const m = await page.evaluate(() => {
        const fs = (el: Element | null) => (el ? parseFloat(getComputedStyle(el).fontSize) : 0);
        const h2 = document.querySelector("main h2");
        const h3 = document.querySelector("main h3");
        const p = [...document.querySelectorAll("main section p")].find((el) => !/(^|\s)text-/.test(el.className)) ?? null;
        const h1 = document.querySelector("h1")!;
        return {
          h1: fs(h1),
          h2: fs(h2),
          h3: fs(h3),
          p: fs(p),
          lh: p ? parseFloat(getComputedStyle(p).lineHeight) / fs(p) : 0,
          weights: [h1, h2, h3].map((el) => (el ? getComputedStyle(el).fontWeight : "")),
          tracking: h2 ? parseFloat(getComputedStyle(h2).letterSpacing) : 0,
          families: [h1, h2, p].map((el) => (el ? getComputedStyle(el).fontFamily : "")),
        };
      });
      const mobile = testInfo.project.name === "mobile";
      expect(m.h1).toBeGreaterThanOrEqual(mobile ? 40 : 72);
      expect(m.h2).toBe(mobile ? 32 : 48);
      expect(m.h3).toBe(21);
      expect(m.p).toBe(17);
      expect(m.lh).toBeGreaterThan(1.4);
      expect(m.lh).toBeLessThan(1.55);
      expect(m.weights).toEqual(["600", "600", "600"]);
      expect(m.tracking).toBeLessThan(0);
      for (const family of m.families) expect(family).toMatch(/Inter/);
    });
  }
});

test.describe("v1.2 · fondos por sección", () => {
  const DARK = "rgb(22, 22, 23)";
  const LIGHT = ["rgb(255, 255, 255)", "rgb(245, 245, 247)"];
  const CASES = [
    { path: "/", dark: ["inicio", "problema", "cierre"] },
    { path: "/academias", dark: ["inicio", "cierre"] },
  ];

  for (const { path, dark } of CASES) {
    test(`RF-44 · ${path}: impacto en casi negro y el resto alterna blanco y gris`, async ({ page }) => {
      await page.goto(path);
      const sections = await page.locator("main > section[id]").evaluateAll((els) =>
        els.map((el) => ({ id: el.id, bg: getComputedStyle(el).backgroundColor, fg: getComputedStyle(el).color })),
      );
      let previousLight: string | null = null;
      for (const s of sections) {
        if (dark.includes(s.id)) {
          expect(s.bg, s.id).toBe(DARK);
          expect(s.fg, s.id).toBe("rgb(245, 245, 247)");
          previousLight = null;
        } else {
          expect(LIGHT, s.id).toContain(s.bg);
          expect(s.fg, s.id).toBe("rgb(29, 29, 31)");
          if (previousLight) expect(s.bg, `${s.id} repite fondo`).not.toBe(previousLight);
          previousLight = s.bg;
        }
      }
    });
  }

  test("CL-13 · el botón principal se distingue en una sección oscura (borde claro)", async ({ page }) => {
    await page.goto("/");
    const border = await page.locator("section#cierre [data-cta='primary']").evaluate((el) => getComputedStyle(el).borderTopColor);
    expect(border).toBe("rgba(255, 255, 255, 0.35)");
  });
});

test.describe("v1.2 · logotipo", () => {
  for (const path of ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"]) {
    test(`RF-42 · la cabecera de ${path} muestra el logo azul y «Local Digital»`, async ({ page, baseURL }) => {
      await page.goto(path);
      const home = page.locator("header").getByRole("link", { name: "Local Digital" });
      await expect(home).toHaveAttribute("href", "/");
      const img = home.locator("img");
      await expect(img).toBeVisible();
      const src = await img.evaluate((el) => (el as HTMLImageElement).currentSrc);
      expect(src.startsWith(new URL(baseURL!).origin)).toBe(true);
      expect(src).toMatch(/logo-azul/);
      expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    });
  }

  test("RF-42 · el favicon es el logotipo", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.locator("link[rel='icon']").first().getAttribute("href");
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    const body = await response.body();
    const size = { w: body.readUInt32BE(16), h: body.readUInt32BE(20) };
    expect(size).toEqual({ w: 64, h: 64 });
    // Píxel central: azul del logotipo (no el logo antiguo rojo/degradado).
    await page.setContent(`<canvas id=c width=64 height=64></canvas>`);
    const rgb = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const ctx = (document.getElementById("c") as HTMLCanvasElement).getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, 64, 64).data;
      let blue = 0;
      for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 200 && Math.abs(data[i] - 13) < 25 && Math.abs(data[i + 1] - 73) < 25 && Math.abs(data[i + 2] - 100) < 25) blue++;
      return blue;
    }, body.toString("base64"));
    expect(rgb).toBeGreaterThan(300);
  });

  test("RF-42 · la imagen para redes tiene fondo casi negro y el logotipo blanco", async ({ page, request }) => {
    const body = await (await request.get("/opengraph-image")).body();
    await page.setContent(`<canvas id=c width=1200 height=630></canvas>`);
    const result = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const ctx = (document.getElementById("c") as HTMLCanvasElement).getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const corner = [...ctx.getImageData(5, 5, 1, 1).data].slice(0, 3);
      const logo = ctx.getImageData(72, 72, 120, 120).data;
      let white = 0;
      for (let i = 0; i < logo.length; i += 4) if (logo[i] > 230 && logo[i + 1] > 230 && logo[i + 2] > 230) white++;
      return { corner, white };
    }, body.toString("base64"));
    expect(result.corner).toEqual([22, 22, 23]);
    expect(result.white).toBeGreaterThan(1000);
  });
});
