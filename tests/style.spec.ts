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
  const DARK = "rgb(0, 0, 0)";
  const LIGHT = ["rgb(255, 255, 255)", "rgb(245, 245, 247)"];
  const CASES = [
    { path: "/", dark: ["inicio", "problema", "cierre"] },
    { path: "/academias", dark: ["inicio", "cierre"] },
  ];

  for (const { path, dark } of CASES) {
    test(`RF-44 · ${path}: impacto en negro y el resto alterna blanco y gris`, async ({ page }) => {
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

  test("CL-13 · el botón principal se invierte en una sección negra (relleno claro, sin borde)", async ({ page }) => {
    await page.goto("/");
    const style = await page.locator("section#cierre [data-cta='primary']").evaluate((el) => {
      const s = getComputedStyle(el);
      return { bg: s.backgroundColor, fg: s.color, border: s.borderTopWidth };
    });
    expect(style).toEqual({ bg: "rgb(245, 245, 247)", fg: "rgb(29, 29, 31)", border: "0px" });
  });
});

test.describe("v1.3 · logotipo gris 3D", () => {
  for (const path of ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"]) {
    test(`RF-42 · cabecera y pie de ${path} muestran el logo 3D (≤ 30 KB) y «Local Digital»`, async ({ page, request, baseURL }) => {
      await page.goto(path);
      const home = page.locator("header").getByRole("link", { name: "Local Digital" });
      await expect(home).toHaveAttribute("href", "/");
      for (const img of [home.locator("img"), page.locator("footer img").first()]) {
        await expect(img).toBeVisible();
        const src = await img.evaluate((el) => (el as HTMLImageElement).currentSrc);
        expect(src.startsWith(new URL(baseURL!).origin)).toBe(true);
        expect(src).toMatch(/\/brand\/logo-3d\.webp$/);
        expect(await img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        const bytes = (await (await request.get(new URL(src).pathname)).body()).length;
        expect(bytes).toBeLessThanOrEqual(30 * 1024);
      }
      await expect(page.locator("footer").getByText("Local Digital").first()).toBeVisible();
    });
  }

  test("RF-42 · las versiones azul y blanca ya no se publican", async ({ request }) => {
    for (const old of ["/brand/logo-azul.png", "/brand/logo-blanco.png"]) {
      expect((await request.get(old)).status()).toBe(404);
    }
  });

  test("RF-42 · el favicon es el logo gris 3D (64 px, sin el azul de marca)", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.locator("link[rel='icon']").first().getAttribute("href");
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    const body = await response.body();
    expect({ w: body.readUInt32BE(16), h: body.readUInt32BE(20) }).toEqual({ w: 64, h: 64 });
    expect(body.length).toBeLessThanOrEqual(10 * 1024);
    await page.setContent(`<canvas id=c width=64 height=64></canvas>`);
    const counts = await page.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const ctx = (document.getElementById("c") as HTMLCanvasElement).getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, 64, 64).data;
      let gray = 0, blue = 0;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 200) continue;
        const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
        if (Math.max(r, g, b) - Math.min(r, g, b) < 24) gray++;
        if (Math.abs(r - 13) < 25 && Math.abs(g - 73) < 25 && Math.abs(b - 100) < 25) blue++;
      }
      return { gray, blue };
    }, body.toString("base64"));
    expect(counts.gray).toBeGreaterThan(600);
    expect(counts.blue).toBe(0);
  });

  test("RF-42 · la imagen para redes lleva el logo gris 3D sobre negro", async ({ page, request }) => {
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
      let midGray = 0;
      for (let i = 0; i < logo.length; i += 4) {
        const [r, g, b] = [logo[i], logo[i + 1], logo[i + 2]];
        if (Math.max(r, g, b) - Math.min(r, g, b) < 24 && r > 60 && r < 230) midGray++;
      }
      return { corner, midGray };
    }, body.toString("base64"));
    expect(result.corner).toEqual([0, 0, 0]);
    expect(result.midGray).toBeGreaterThan(1000);
  });
});

test.describe("v1.4 · cabecera negra", () => {
  const BLACK = "rgb(0, 0, 0)";
  const LIGHT_TEXT = "rgb(245, 245, 247)";

  for (const path of ["/", "/academias", "/aviso-legal", "/no-existe"]) {
    test(`RF-45 · ${path}: cabecera negra con texto claro`, async ({ page }) => {
      await page.goto(path);
      const header = page.locator("header").first();
      const styles = await header.evaluate((el) => ({
        bg: getComputedStyle(el).backgroundColor,
        fg: getComputedStyle(el).color,
        links: [...el.querySelectorAll("a:not([data-cta]), summary")]
          .filter((a) => (a as HTMLElement).offsetParent !== null)
          .map((a) => getComputedStyle(a).color),
      }));
      expect(styles.bg).toBe(BLACK);
      expect(styles.fg).toBe(LIGHT_TEXT);
      for (const color of styles.links) expect(color).toBe(LIGHT_TEXT);
    });
  }

  test("RF-45 · sigue negra al desplazarse sobre una sección blanca", async ({ page }) => {
    await page.goto("/");
    const white = page.locator("main > section[id]").filter({ has: page.locator("h2") });
    const ids = await white.evaluateAll((els) =>
      els.filter((el) => getComputedStyle(el).backgroundColor === "rgb(255, 255, 255)").map((el) => el.id),
    );
    expect(ids.length).toBeGreaterThan(0);
    await page.locator(`#${ids[0]}`).scrollIntoViewIfNeeded();
    const bg = await page.locator("header").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toBe(BLACK);
  });

  test("RF-45 · en móvil el menú desplegado es negro con enlaces claros", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
    await page.locator("header summary").click();
    const menu = page.locator("header details nav");
    await expect(menu).toBeVisible();
    const styles = await menu.evaluate((el) => ({
      bg: getComputedStyle(el).backgroundColor,
      link: getComputedStyle(el.querySelector("a")!).color,
    }));
    expect(styles.bg).toBe(BLACK);
    expect(styles.link).toBe(LIGHT_TEXT);
  });
});

test.describe("v1.5 · botones de apple.com/services", () => {
  for (const { path, needsLight } of [{ path: "/", needsLight: true }, { path: "/academias", needsLight: false }]) {
    test(`RF-46 · RF-01 · ${path}: botón principal en cápsula, invertido según el fondo`, async ({ page }) => {
      await page.goto(path);
      const buttons = await page.locator("[data-cta='primary']").evaluateAll((els) =>
        els
          .filter((el) => (el as HTMLElement).offsetParent !== null)
          .map((el) => {
            const s = getComputedStyle(el);
            const box = el.getBoundingClientRect();
            const container = el.closest("section, header")!;
            return {
              where: container.id || container.tagName,
              containerBg: getComputedStyle(container).backgroundColor,
              bg: s.backgroundColor,
              fg: s.color,
              border: s.borderTopWidth,
              radius: parseFloat(s.borderTopLeftRadius),
              height: box.height,
            };
          }),
      );
      expect(buttons.length).toBeGreaterThan(1);
      let light = 0;
      for (const b of buttons) {
        const onBlack = b.containerBg === "rgb(0, 0, 0)";
        if (!onBlack) light++;
        expect(b.bg, b.where).toBe(onBlack ? "rgb(245, 245, 247)" : "rgb(29, 29, 31)");
        expect(b.fg, b.where).toBe(onBlack ? "rgb(29, 29, 31)" : "rgb(255, 255, 255)");
        expect(b.border, b.where).toBe("0px");
        expect(b.radius, b.where).toBeGreaterThanOrEqual(22);
        expect(b.height, b.where).toBeGreaterThanOrEqual(44);
      }
      // En /academias todos los botones están en la cabecera o en secciones negras.
      if (needsLight) expect(light, "algún botón sobre fondo claro").toBeGreaterThan(0);
    });
  }

  test("RF-46 · RF-38 · los enlaces de servicios y sectores son «… ›» sin subrayado y se subrayan con el foco", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("section#que-ofrecemos article > a, section#sectores a");
    const count = await links.count();
    expect(count).toBeGreaterThan(3);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const style = await link.evaluate((el) => ({
        decoration: getComputedStyle(el).textDecorationLine,
        after: getComputedStyle(el, "::after").content,
        text: el.textContent!.trim(),
      }));
      expect(style.decoration).toBe("none");
      expect(style.after).toContain("›");
      // La flecha es decorativa: no forma parte del nombre accesible.
      await expect(page.getByRole("link", { name: style.text, exact: true }).first()).toBeAttached();
      await link.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      expect(await link.evaluate((el) => getComputedStyle(el).textDecorationLine)).toBe("underline");
    }
  });
});
