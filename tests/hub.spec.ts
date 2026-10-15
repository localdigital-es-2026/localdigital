import { expect, test } from "@playwright/test";
import { hub } from "../src/content/hub";
import type { Section } from "../src/content/types";

const byKind = <K extends Section["kind"]>(kind: K) =>
  hub.sections.find((s) => s.kind === kind) as Extract<Section, { kind: K }>;

test.describe("HUB · secciones superiores", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("RF-10 · portada con etiqueta, titular único, subtítulo, botón, nota e imagen fija", async ({ page }) => {
    const hero = byKind("hero");
    const section = page.locator(`section#${hero.id}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(section.locator("h1")).toHaveText(hero.title);
    await expect(section.getByText(hero.eyebrow)).toBeVisible();
    await expect(section.getByText(hero.subtitle)).toBeVisible();
    await expect(section.locator("[data-cta='primary']")).toBeVisible();
    await expect(section.getByText(hero.ctaNote)).toBeVisible();
    await expect(section.getByRole("img")).toHaveAccessibleName(/.+/);
  });

  test("RF-34 · sin número del asistente de ejemplo no aparece el enlace «pruébalo ya»", async ({ page }) => {
    await expect(page.getByText(/Prefieres probarlo ya/)).toHaveCount(0);
    await expect(page.locator("a[href*='wa.me']")).toHaveCount(0);
  });

  test("RF-10 · problema con su titular, tres escenas y cierre", async ({ page }) => {
    const problem = byKind("problem");
    const section = page.locator(`section#${problem.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(problem.title);
    for (const scene of problem.scenes) await expect(section.getByText(scene.title)).toBeVisible();
    await expect(section.getByText(problem.closing)).toBeVisible();
  });

  test("RF-10 · qué hacemos con sus cuatro puntos, el control y el botón", async ({ page }) => {
    const features = byKind("features");
    const section = page.locator(`section#${features.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(features.title);
    await expect(section.getByText(features.intro)).toBeVisible();
    await expect(section.locator("li")).toHaveCount(features.items.length);
    for (const item of features.items) await expect(section.getByText(item.title)).toBeVisible();
    await expect(section.getByText(features.control!.body)).toBeVisible();
    await expect(section.locator("[data-cta='primary']")).toHaveCount(1);
  });

  test("RF-38 · servicios: tres bloques con la misma plantilla y sin botones", async ({ page }) => {
    const services = byKind("services");
    const section = page.locator(`section#${services.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(services.title);
    const blocks = section.locator("[data-service]");
    await expect(blocks).toHaveCount(3);
    for (const [i, block] of (await blocks.all()).entries()) {
      const data = services.blocks[i];
      await expect(block.locator("svg").first()).toBeVisible();
      await expect(block.getByRole("heading", { level: 3 })).toHaveText(data.name);
      await expect(block.getByText(data.title)).toBeVisible();
      await expect(block.locator("[data-service-price]")).toContainText(data.price);
      await expect(block.locator("[data-service-price] sup a[href='#nota-1']")).toHaveAccessibleName("Nota 1");
      await expect(block.getByRole("link", { name: data.link.label })).toHaveAttribute("href", data.link.href);
    }
    await expect(section.locator("[data-cta='primary'], button")).toHaveCount(0);
  });

  test("RF-10 · cómo funciona como lista ordenada de tres pasos", async ({ page }) => {
    const steps = byKind("steps");
    const section = page.locator(`section#${steps.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(steps.title);
    await expect(section.locator("ol > li")).toHaveCount(3);
    for (const step of steps.steps) await expect(section.getByText(step.title)).toBeVisible();
  });
});

test.describe("HUB · precios y piloto", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("RF-03 · precios con importes, IVA, sin permanencia, garantía y un botón", async ({ page }) => {
    const pricing = byKind("pricing");
    const section = page.locator(`section#${pricing.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(pricing.title);
    for (const plan of pricing.plans) await expect(section.getByRole("heading", { level: 3, name: plan.title })).toBeVisible();
    const text = await section.innerText();
    expect(text).toMatch(/desde 375\s€/);
    expect(text).toMatch(/75\s€\/mes/);
    expect(text).toMatch(/Desde 449\s€/);
    expect(text).toMatch(/99\s€/);
    expect(text).toContain("Incluida con la web");
    expect(text).toContain("IVA no incluido");
    expect(text).toContain("Sin permanencia");
    expect(text).toContain("Si en los primeros 60 días no te convence, te devolvemos la instalación.");
    await expect(section.locator("[data-cta='primary']")).toHaveCount(1);
  });

  test("RF-04 · piloto con precio de lanzamiento, lo que pedimos a cambio y plazas libres", async ({ page }) => {
    const pilot = byKind("pilot");
    const section = page.locator(`section#${pilot.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("Buscamos 3 negocios para nuestros primeros casos.");
    const text = await section.innerText();
    expect(text).toMatch(/190\s€ en lugar de 375\s€/);
    for (const ask of pilot.asks) expect(text).toContain(ask);
    await expect(section.getByText("Quedan 3 plazas.")).toBeVisible();
  });
});

test.describe("HUB · secciones inferiores", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("RF-14 · sectores: solo academias, con enlace, y sin «próximamente»", async ({ page }) => {
    const section = page.locator(`section#${byKind("sectors").id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText("¿Tienes una academia o una autoescuela?");
    await expect(section.getByText(/matrículas, horarios, plazas/)).toBeVisible();
    const links = section.getByRole("link");
    await expect(links).toHaveCount(1);
    await expect(links).toHaveAttribute("href", "/academias");
    await expect(links).toHaveText("Ver la solución para academias →");
    expect(await page.locator("body").innerText()).not.toMatch(/próximamente/i);
  });

  test("RF-36 · quiénes somos con ilustración descrita y sin fotografías", async ({ page }) => {
    const about = byKind("about");
    const section = page.locator(`section#${about.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(about.title);
    for (const paragraph of about.body) await expect(section.getByText(paragraph)).toBeVisible();
    for (const item of about.commitments ?? []) await expect(section.getByText(item.title)).toBeVisible();
    await expect(section.getByRole("img")).toHaveAccessibleName(/.+/);
    await expect(section.locator("img[src$='.jpg'], img[src$='.jpeg'], img[src$='.png'], img[src$='.webp']")).toHaveCount(0);
  });

  test("RF-10 · tus datos con sus tres puntos", async ({ page }) => {
    const privacy = byKind("privacy");
    const section = page.locator(`section#${privacy.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(privacy.title);
    for (const point of privacy.points) await expect(section.getByText(point)).toBeVisible();
  });

  test("RF-07 · cada pregunta frecuente se abre y se cierra con clic y con teclado", async ({ page }) => {
    const faq = byKind("faq");
    const section = page.locator(`section#${faq.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(faq.title);
    const items = section.locator("details");
    await expect(items).toHaveCount(faq.items.length);

    const first = items.first();
    const summary = first.locator("summary");
    await expect(summary).toHaveText(faq.items[0].q);
    await expect(first.getByText(faq.items[0].a)).toBeHidden();
    await summary.click();
    await expect(first.getByText(faq.items[0].a)).toBeVisible();
    await summary.click();
    await expect(first.getByText(faq.items[0].a)).toBeHidden();

    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(first.getByText(faq.items[0].a)).toBeVisible();
    await page.keyboard.press("Space");
    await expect(first.getByText(faq.items[0].a)).toBeHidden();
  });

  test("RF-10 · cierre con titular, texto y botón", async ({ page }) => {
    const closing = byKind("closing");
    const section = page.locator(`section#${closing.id}`);
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(closing.title);
    await expect(section.getByText(closing.body)).toBeVisible();
    await expect(section.locator("[data-cta='primary']")).toHaveCount(1);
  });
});

test.describe("HUB · página y menú", () => {
  test("RF-10 · las secciones aparecen en el orden de la spec", async ({ page }) => {
    await page.goto("/");
    const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(hub.sections.map((s) => s.id));
  });

  test("RF-11 · el menú de escritorio tiene los cinco enlaces y el botón", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const link of hub.navLinks!) {
      await expect(nav.getByRole("link", { name: link.label, exact: true })).toHaveAttribute("href", link.href);
    }
    await expect(page.locator("header [data-cta='primary']")).toBeVisible();
  });

  test("RF-12 · cada enlace del menú lleva a su sección", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const link of hub.navLinks!) {
      await nav.getByRole("link", { name: link.label, exact: true }).click();
      await expect(page.locator(link.href)).toBeInViewport();
    }
  });

  test("RF-13 · en móvil el menú está plegado y se abre y cierra con su botón", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/");
    const toggle = page.locator("header summary");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveText("Menú");
    const firstLink = page.locator("header").getByRole("link", { name: hub.navLinks![0].label, exact: true });
    await expect(firstLink).toBeHidden();
    await toggle.click();
    await expect(firstLink).toBeVisible();
    await expect(page.locator("header [data-cta='primary']")).toBeVisible();
    await toggle.click();
    await expect(firstLink).toBeHidden();
  });

  for (const anchor of ["#faq", "#servicios", "#proceso", "#sobre-nosotros"]) {
    test(`CL-07 · la dirección antigua /${anchor} lleva a su sección`, async ({ page }) => {
      await page.goto(`/${anchor}`);
      await expect(page.locator(anchor)).toBeInViewport();
    });
  }

  test("CL-07 · la dirección antigua /#casos-de-exito carga la portada sin error", async ({ page }) => {
    const response = await page.goto("/#casos-de-exito");
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  });
});
