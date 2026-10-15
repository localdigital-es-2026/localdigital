import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// Cambio v1.8 · rediseño según la maqueta (RF-48 a RF-57).

const WHITE = "rgb(255, 255, 255)";
const GRAY = "rgb(245, 245, 247)";
const BLUE = "rgb(0, 113, 227)";
const BLUE_TEXT = "rgb(0, 88, 176)";
const LINK = "rgb(0, 102, 204)";

test.describe("T-44 · paleta y botones", () => {
  for (const path of ["/", "/academias", "/aviso-legal"]) {
    test(`RF-48 · ${path}: sin secciones negras; blanco y gris alternos (piloto en azul)`, async ({ page }) => {
      await page.goto(path);
      const sections = await page.locator("main section[id], main > article").evaluateAll((els) =>
        els.map((el) => ({ id: el.id, bg: getComputedStyle(el).backgroundColor })),
      );
      expect(sections.length).toBeGreaterThan(0);
      let previous: string | null = null;
      for (const s of sections) {
        expect(s.bg, s.id).not.toBe("rgb(0, 0, 0)");
        if (s.id === "piloto") {
          expect(s.bg).toBe(BLUE);
          previous = null;
          continue;
        }
        expect([WHITE, GRAY, "rgba(0, 0, 0, 0)"], s.id).toContain(s.bg);
        if (s.bg !== "rgba(0, 0, 0, 0)") {
          if (previous) expect(s.bg, `${s.id} repite fondo`).not.toBe(previous);
          previous = s.bg;
        }
      }
    });
  }

  for (const path of ["/", "/academias"]) {
    test(`RF-48 · RF-01 · ${path}: botón principal azul (blanco en la banda del piloto)`, async ({ page }) => {
      await page.goto(path);
      const buttons = await page.locator("[data-cta='primary']").evaluateAll((els) =>
        els
          .filter((el) => (el as HTMLElement).offsetParent !== null)
          .map((el) => {
            const s = getComputedStyle(el);
            return {
              inPilot: !!el.closest("#piloto"),
              text: el.textContent,
              bg: s.backgroundColor,
              fg: s.color,
              radius: parseFloat(s.borderTopLeftRadius),
              height: el.getBoundingClientRect().height,
            };
          }),
      );
      expect(buttons.length).toBeGreaterThan(1);
      for (const b of buttons) {
        expect(b.text).toBe("Reserva una demo de 15 min");
        expect(b.bg).toBe(b.inPilot ? WHITE : BLUE);
        expect(b.fg).toBe(b.inPilot ? BLUE_TEXT : WHITE);
        expect(b.radius).toBeGreaterThanOrEqual(22);
        expect(b.height).toBeGreaterThanOrEqual(44);
      }
    });
  }

  test("RF-48 · los enlaces de servicios y sectores son azules y terminan en «›»", async ({ page }) => {
    await page.goto("/");
    const links = page.locator("main a.ld-more");
    expect(await links.count()).toBeGreaterThan(1);
    for (const color of await links.evaluateAll((els) => els.map((el) => getComputedStyle(el).color))) {
      expect(color).toBe(LINK);
    }
  });

  test("RF-48 · el botón secundario es una cápsula de contorno azul", () => {
    const source = readFileSync("src/components/layout/SecondaryButton.tsx", "utf8");
    for (const cls of ["rounded-full", "border", "border-blue", "text-blue", "bg-transparent", "min-h-11"]) {
      expect(source).toMatch(new RegExp(`[\\s"\`]${cls}[\\s"\`]`));
    }
  });
});

const LIGHT_HEADER = /^rgba?\((2[3-5]\d), (2[3-5]\d), (2[3-5]\d)(, 0\.\d+)?\)$/;

test.describe("T-45 · cabecera clara y menú de escritorio", () => {
  for (const path of ["/", "/academias", "/aviso-legal", "/no-existe"]) {
    test(`RF-49 · ${path}: cabecera clara`, async ({ page }) => {
      await page.goto(path);
      const bg = await page.locator("header").first().evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(bg).toMatch(LIGHT_HEADER);
    });
  }

  for (const [path, expected] of [["/", 1], ["/academias", 1], ["/aviso-legal", 0], ["/no-existe", 0]] as const) {
    test(`RF-49 · ${path}: ${expected} botón principal visible en la cabecera`, async ({ page }, testInfo) => {
      test.skip(path === "/" && testInfo.project.name === "mobile", "En móvil el botón del HUB está dentro del menú (RF-51)");
      await page.goto(path);
      const visible = await page
        .locator("header [data-cta='primary']")
        .evaluateAll((els) => els.filter((el) => (el as HTMLElement).offsetParent !== null).map((el) => el.textContent));
      expect(visible).toEqual(Array(expected).fill("Reserva una demo de 15 min"));
    });
  }

  test.describe("escritorio", () => {
    test.beforeEach(async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "desktop-chrome");
      await page.goto("/");
    });

    test("RF-49 · el menú queda centrado en la cabecera", async ({ page }) => {
      const header = await page.locator("header").first().boundingBox();
      const nav = await page.getByRole("navigation", { name: "Principal" }).boundingBox();
      expect(Math.abs(nav!.x + nav!.width / 2 - (header!.x + header!.width / 2))).toBeLessThanOrEqual(40);
    });

    test("RF-50 · cabeceras del menú", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Principal" });
      for (const label of ["Servicios", "Sectores", "Cómo trabajamos"]) await expect(nav.getByText(label, { exact: true })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Precios", exact: true })).toHaveAttribute("href", "#precios");
      await expect(nav.getByRole("link", { name: "Nosotros", exact: true })).toHaveAttribute("href", "#sobre-nosotros");
    });

    test("RF-50 · Servicios se abre con clic, Escape lo cierra y abrir otro cierra el anterior", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Principal" });
      const asistente = nav.getByRole("link", { name: /Asistente de WhatsApp/ });
      await expect(asistente).toBeHidden();
      await nav.getByText("Servicios", { exact: true }).click();
      await expect(asistente).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(asistente).toBeHidden();
      await nav.getByText("Servicios", { exact: true }).click();
      await nav.getByText("Sectores", { exact: true }).click();
      await expect(asistente).toBeHidden();
      await expect(nav.getByRole("link", { name: /Academias y autoescuelas/ })).toHaveAttribute("href", "/academias");
    });

    test("RF-50 · al elegir un enlace va a la sección y el desplegable se cierra", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Principal" });
      await nav.getByText("Cómo trabajamos", { exact: true }).click();
      const link = nav.getByRole("link", { name: /Cómo funciona/ });
      await link.click();
      await expect(page.locator("#proceso")).toBeInViewport();
      await expect(link).toBeHidden();
    });

    test("RF-50 · un clic fuera cierra el desplegable", async ({ page }) => {
      const nav = page.getByRole("navigation", { name: "Principal" });
      await nav.getByText("Servicios", { exact: true }).click();
      await page.locator("main h1").click();
      await expect(nav.getByRole("link", { name: /Asistente de WhatsApp/ })).toBeHidden();
    });

    test("RF-50 · se abre con el teclado", async ({ page }) => {
      const summary = page.getByRole("navigation", { name: "Principal" }).locator("summary", { hasText: "Servicios" });
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: /Web para tu negocio/ })).toBeVisible();
    });
  });
});

test.describe("T-45 · sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("RF-50 · los desplegables se abren y cierran sin JavaScript", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Principal" });
    const summary = nav.locator("summary", { hasText: "Servicios" });
    await summary.click();
    await expect(nav.getByRole("link", { name: /Ficha de Google Maps/ })).toBeVisible();
    await summary.click();
    await expect(nav.getByRole("link", { name: /Ficha de Google Maps/ })).toBeHidden();
  });
});

test.describe("T-46 · menú móvil", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
  });

  const toggle = (page: import("@playwright/test").Page) => page.locator("header details[data-mobile-menu] > summary");

  test("RF-51 · «Abrir menú» lo muestra a pantalla completa con sus apartados y el botón", async ({ page }) => {
    await expect(toggle(page)).toHaveAccessibleName("Abrir menú");
    await toggle(page).click();
    await expect(toggle(page)).toHaveAccessibleName("Cerrar menú");
    const panel = page.locator("header details[data-mobile-menu] > div");
    const box = await panel.boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.width).toBeGreaterThanOrEqual(viewport.width - 1);
    expect(box!.y + box!.height).toBeGreaterThanOrEqual(viewport.height - 1);
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const label of ["Servicios", "Sectores", "Cómo trabajamos"]) await expect(nav.getByText(label, { exact: true })).toBeVisible();
    await expect(nav.locator("[data-cta='primary']")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.classList.contains("ld-menu-open"))).toBe(true);
  });

  test("RF-51 · al pulsar «Precios» llega a la sección y el menú se cierra", async ({ page }) => {
    await toggle(page).click();
    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Precios", exact: true }).click();
    await expect(page.locator("#precios")).toBeInViewport();
    await expect(page.locator("header details[data-mobile-menu]")).not.toHaveAttribute("open", "");
    expect(await page.evaluate(() => document.documentElement.classList.contains("ld-menu-open"))).toBe(false);
  });

  test("RF-51 · un enlace dentro de un apartado también cierra el menú", async ({ page }) => {
    await toggle(page).click();
    const nav = page.getByRole("navigation", { name: "Principal" });
    await nav.locator("summary", { hasText: "Cómo trabajamos" }).click();
    await nav.getByRole("link", { name: "Cómo funciona", exact: true }).click();
    await expect(page.locator("#proceso")).toBeInViewport();
    await expect(page.locator("header details[data-mobile-menu]")).not.toHaveAttribute("open", "");
  });

  test("RF-51 · «Cerrar menú» y Escape lo cierran", async ({ page }) => {
    await toggle(page).click();
    await toggle(page).click();
    await expect(page.locator("header details[data-mobile-menu]")).not.toHaveAttribute("open", "");
    await toggle(page).click();
    await page.keyboard.press("Escape");
    await expect(page.locator("header details[data-mobile-menu]")).not.toHaveAttribute("open", "");
  });
});

test.describe("T-46 · menú móvil sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("RF-51 · se abre y se cierra sin JavaScript", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
    const summary = page.locator("header details[data-mobile-menu] > summary");
    await summary.click();
    await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Precios", exact: true })).toBeVisible();
    await summary.click();
    await expect(page.getByRole("navigation", { name: "Principal" })).toBeHidden();
  });
});

test.describe("T-47 · portada y problema con dibujos", () => {
  for (const path of ["/", "/academias"]) {
    test(`RF-52 · ${path}: dos botones y un móvil dibujado con una conversación de ejemplo`, async ({ page }) => {
      const rasters: string[] = [];
      page.on("request", (r) => {
        if (r.resourceType() === "image" && !/icon\.png|\/brand\//.test(r.url())) rasters.push(r.url());
      });
      await page.goto(path);
      const hero = page.locator("section#inicio");
      await expect(hero).toHaveCSS("background-color", GRAY);
      await expect(hero.locator("[data-cta='primary']")).toBeVisible();
      const secondary = hero.locator("a[data-secondary]", { hasText: "Ver precios" });
      await expect(secondary).toHaveAttribute("href", "#precios");
      await expect(secondary).toHaveCSS("border-top-color", BLUE);
      await expect(secondary).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
      const phone = hero.locator("[role='img'][data-phone-chat]");
      await expect(phone).toHaveAccessibleName(/WhatsApp/);
      await expect(phone.getByText("Ejemplo", { exact: true })).toBeVisible();
      expect(await phone.locator("[data-chat-message]").count()).toBeGreaterThanOrEqual(4);
      await expect(hero.locator("img, canvas")).toHaveCount(0);
      expect(rasters).toEqual([]);
    });
  }

  test("RF-52 · textos de la portada del HUB (v1.8)", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("section#inicio");
    await expect(hero.getByText("Un asistente contesta a tus clientes en segundos. Tú solo hablas con los que ya quieren comprar.")).toBeVisible();
    await expect(hero.getByText("Gratis y sin compromiso", { exact: true })).toBeVisible();
    await expect(hero.locator("[data-phone-chat]")).toContainText("¿tenéis cita el sábado por la mañana?");
  });

  test("RF-53 · el problema muestra tres escenas y una pantalla de bloqueo con mensajes sin leer", async ({ page }) => {
    await page.goto("/");
    const problem = page.locator("section#problema");
    await expect(problem.locator("[data-scene]")).toHaveCount(3);
    const lock = problem.locator("[role='img'][data-lock-screen]");
    await expect(lock).toHaveAccessibleName(/sin leer/);
    await expect(lock).toBeVisible();
  });
});

test.describe("T-48 · servicios, pasos, piloto, sector y preguntas", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("RF-10 · RF-57 · nuevo orden de secciones, sin «qué ofrecemos» ni «tus datos»", async ({ page }) => {
    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(["inicio", "problema", "preguntas", "servicios", "proceso", "precios", "piloto", "sectores", "sobre-nosotros", "faq", "cierre"]);
  });

  test("RF-54 · servicios: tarjeta grande del asistente y dos tarjetas con color, sin botones", async ({ page }) => {
    const section = page.locator("section#servicios");
    const cards = section.locator("[data-service]");
    await expect(cards).toHaveCount(3);
    const backgrounds = await cards.evaluateAll((els) => els.map((el) => getComputedStyle(el).backgroundColor));
    expect(backgrounds).toEqual(["rgb(233, 248, 238)", "rgb(232, 241, 253)", "rgb(253, 241, 227)"]);
    const assistant = cards.first();
    await expect(assistant.getByText("El más pedido", { exact: true })).toBeVisible();
    await expect(assistant.locator("[data-feature]")).toHaveCount(4);
    const summary = assistant.locator("[role='img'][data-summary]");
    await expect(summary).toHaveAccessibleName(/resumen mensual/);
    await expect(summary).toContainText("Ejemplo");
    expect(await summary.innerText()).not.toMatch(/\d/);
    for (const card of await cards.all()) {
      await expect(card.locator("[data-service-price] sup a[href='#nota-1']")).toHaveCount(1);
      await expect(card.locator("a.ld-more")).toHaveAttribute("href", "#precios");
    }
    await expect(cards.nth(1).locator("[role='img']")).toHaveAccessibleName(/web/i);
    await expect(cards.nth(2).locator("[role='img']")).toHaveAccessibleName(/Google Maps/);
    await expect(section.locator("[data-cta], button")).toHaveCount(0);
  });

  test("RF-55 · cada paso con miniatura dibujada, número, titular y frase", async ({ page }) => {
    const steps = page.locator("section#proceso ol > li");
    await expect(steps).toHaveCount(3);
    for (const [index, step] of (await steps.all()).entries()) {
      await expect(step.locator("[role='img']")).toHaveAccessibleName(/.+/);
      await expect(step.getByText(`Paso ${index + 1}`, { exact: true })).toBeVisible();
      await expect(step.locator("h3")).toBeVisible();
    }
  });

  test("RF-56 · piloto en banda azul con plazas, precios y el botón", async ({ page }) => {
    const pilot = page.locator("section#piloto");
    await expect(pilot).toHaveCSS("background-color", BLUE);
    await expect(pilot.getByText("Quedan 3 de 3 plazas.", { exact: true })).toBeVisible();
    const text = await pilot.innerText();
    expect(text).toMatch(/190\s€ en lugar de 375\s€/);
    await expect(pilot.locator("[data-cta='primary']")).toBeVisible();
  });

  test("RF-57 · tus datos como pregunta frecuente; sector sin imagen; quiénes somos con ilustración", async ({ page }) => {
    const faq = page.locator("section#faq");
    const item = faq.locator("details", { hasText: "¿Qué pasa con los datos de mis clientes?" });
    await item.locator("summary").click();
    await expect(item).toContainText("RGPD");
    await expect(item).toContainText("no se usan para entrenar ninguna IA");
    await expect(item).toContainText("Tú decides qué información puede dar el asistente.");
    await expect(page.locator("section#sectores img, section#sectores [role='img']")).toHaveCount(0);
    await expect(page.locator("section#sobre-nosotros [role='img']")).toHaveAccessibleName(/Beatriz/);
    await expect(page.locator("section#sobre-nosotros [data-commitment]")).toHaveCount(3);
  });
});

test.describe("T-49 · cabecera en móvil", () => {
  for (const path of ["/", "/academias", "/aviso-legal"]) {
    test(`RF-49 · RF-51 · ${path}: cabecera de una sola línea en móvil`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "mobile");
      await page.goto(path);
      const header = page.locator("header").first();
      expect((await header.boundingBox())!.height).toBeLessThanOrEqual(64);
      const logo = header.getByRole("link", { name: "Local Digital" });
      expect((await logo.boundingBox())!.height).toBeLessThanOrEqual(48);
      if (path === "/") {
        await expect(header.locator("[data-cta='primary']:visible")).toHaveCount(0);
      }
    });
  }
});
