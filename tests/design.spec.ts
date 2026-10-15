import { expect, test } from "@playwright/test";

const PAGES = ["/", "/aviso-legal"];

test.describe("Paleta v1.2", () => {
  for (const path of PAGES) {
    test(`RF-28 · ${path} usa la paleta v1.2 y el botón de RF-46`, async ({ page }) => {
      await page.goto(path);
      const colors = await page.evaluate(() => {
        const root = getComputedStyle(document.documentElement);
        const body = getComputedStyle(document.body);
        const cta = document.querySelector("main [data-cta='primary']");
        const c = cta ? getComputedStyle(cta) : null;
        return {
          background: body.backgroundColor,
          text: body.color,
          brand: root.getPropertyValue("--ld-brand").trim().toLowerCase(),
          dark: root.getPropertyValue("--ld-dark").trim().toLowerCase(),
          gray: root.getPropertyValue("--ld-gray").trim().toLowerCase(),
          ctaBg: c?.backgroundColor,
          ctaText: c?.color,
          ctaBorder: c?.borderTopWidth,
        };
      });
      expect(colors.background).toBe("rgb(255, 255, 255)");
      expect(colors.text).toBe("rgb(29, 29, 31)");
      expect(colors.brand).toBe("#0d4964");
      expect(colors.dark).toMatch(/^#000(000)?$/); // el minificador de CSS escribe #000
      expect(colors.gray).toBe("#f5f5f7");
      // v1.6: las páginas legales no llevan botón; en / el primero está en la portada negra (RF-46).
      if (path === "/") {
        expect(colors.ctaBg).toBe("rgb(245, 245, 247)");
        expect(colors.ctaText).toBe("rgb(29, 29, 31)");
        expect(colors.ctaBorder).toBe("0px");
      } else {
        expect(colors.ctaBg).toBeUndefined();
      }
    });
  }
});

test.describe("Tipografía", () => {
  test("RF-26 · RF-43 · títulos y texto con Inter, servida desde el propio dominio", async ({ page, baseURL }) => {
    const fontRequests: string[] = [];
    page.on("request", (request) => {
      if (request.resourceType() === "font") fontRequests.push(request.url());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const families = await page.evaluate(() => ({
      heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
      body: getComputedStyle(document.body).fontFamily,
    }));
    expect(families.heading).toMatch(/Inter/);
    expect(families.heading).not.toMatch(/Fraunces/);
    expect(families.body).toMatch(/Inter/);
    expect(fontRequests.length).toBeGreaterThan(0);
    for (const url of fontRequests) expect(url.startsWith(new URL(baseURL!).origin)).toBe(true);
  });
});

test.describe("Movimiento", () => {
  test("RF-30 · con reducir movimiento no hay animaciones, transiciones ni desplazamiento suave", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const offenders = await page.evaluate(() => {
      const bad: string[] = [];
      for (const el of Array.from(document.querySelectorAll("*"))) {
        const style = getComputedStyle(el);
        const transitions = style.transitionDuration.split(",").map((d) => parseFloat(d));
        if (style.animationName !== "none" || transitions.some((d) => d > 0)) bad.push(el.tagName);
      }
      return { bad, scroll: getComputedStyle(document.documentElement).scrollBehavior };
    });
    expect(offenders.bad).toEqual([]);
    expect(offenders.scroll).toBe("auto");
  });

  test("RF-30 · sin reducir movimiento el desplazamiento a secciones es suave", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const scroll = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    expect(scroll).toBe("smooth");
  });
});

test.describe("Ilustraciones", () => {
  for (const path of ["/", "/academias"]) {
    test(`RF-33 · RF-36 · la portada de ${path} muestra la imagen fija con texto alternativo`, async ({ page }) => {
      await page.goto(path);
      const still = page.locator("section#inicio [data-hero-still]");
      await expect(still).toBeVisible();
      await expect(still).toHaveAccessibleName(/.+/);
    });
  }

  for (const path of ["/", "/academias", "/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"]) {
    test(`RF-36 · ${path} no carga fotografías`, async ({ page }) => {
      const rasters: string[] = [];
      page.on("request", (request) => {
        if (request.resourceType() === "image" && /\.(jpe?g|png|webp|avif)(\?|$)/i.test(request.url())) rasters.push(request.url());
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      // El logotipo (RF-42, carpeta /brand/) y el favicon no son fotografías.
      expect(rasters.filter((url) => !/icon\.png|\/brand\//.test(url))).toEqual([]);
    });
  }
});
