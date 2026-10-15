import { expect, test } from "@playwright/test";

const PAGES = ["/", "/academias"];

test.describe("Adaptable", () => {
  for (const path of PAGES) {
    test(`RNF-03 · ${path} sin desplazamiento horizontal entre 320 y 1920 px`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chrome");
      for (const width of [320, 375, 768, 1280, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `ancho ${width}`).toBeLessThanOrEqual(0);
      }
    });

    test(`RNF-03 · ${path} con objetivos táctiles de al menos 44 px en móvil`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile");
      await page.goto(path);
      const small = await page
        .locator("header a, header summary, footer a, [data-cta='primary'], details > summary")
        .evaluateAll((els) =>
          els
            .filter((el) => (el as HTMLElement).offsetParent !== null)
            .map((el) => ({ text: (el.textContent ?? "").trim().slice(0, 30), box: el.getBoundingClientRect() }))
            .filter(({ box }) => box.height < 44)
            .map(({ text, box }) => `${text} (${Math.round(box.height)} px)`),
        );
      expect(small).toEqual([]);
    });
  }
});

test.describe("Teclado y foco", () => {
  for (const path of PAGES) {
    test(`RNF-02 · ${path} se recorre con teclado y el foco siempre es visible`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chrome");
      await page.goto(path);
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press("Tab");
        const focus = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          if (!el || el === document.body) return null;
          const s = getComputedStyle(el);
          return {
            tag: el.tagName,
            visible: (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== "none",
          };
        });
        if (!focus) break;
        expect(focus.visible, `foco en ${focus.tag} (${i})`).toBe(true);
      }
    });
  }
});

test.describe("Sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of PAGES) {
    test(`RNF-04 · CL-01 · ${path} muestra textos, precios y botón, y la FAQ funciona sin JS`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toBeVisible();
      expect((await page.locator("main").innerText()).replace(/ /g, " ")).toContain("375 €");
      await expect(page.locator("main [data-cta='primary']").first()).toBeVisible();
      const faq = page.locator("section#faq details").first();
      await faq.locator("summary").click();
      await expect(faq).toHaveAttribute("open", "");
    });
  }

  test("RNF-04 · CL-01 · el menú móvil se abre sin JS", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
    await page.locator("header summary").click();
    await expect(page.locator("header").getByRole("link", { name: "Precios", exact: true })).toBeVisible();
  });
});
