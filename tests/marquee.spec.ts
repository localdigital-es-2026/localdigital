import { expect, test, type Page } from "@playwright/test";
import { hub } from "../src/content/hub";

const SECTION = "section#preguntas";
const questions = (hub.sections.find((s) => s.kind === "marquee") as { questions: string[] }).questions;

async function playState(page: Page) {
  return page.locator(`${SECTION} [data-marquee-track]`).evaluate((el) => {
    const s = getComputedStyle(el);
    return { name: s.animationName, state: s.animationPlayState };
  });
}

test.describe("v1.1 · cinta de preguntas en movimiento", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
  });

  test("RF-39 · la cinta se desplaza de forma continua", async ({ page }) => {
    await page.goto("/");
    const { name, state } = await playState(page);
    expect(name).not.toBe("none");
    expect(state).toBe("running");
  });

  test("RF-39 · se pausa y se reanuda con el control (clic)", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("checkbox", { name: /Pausar la cinta/ });
    await page.locator(`${SECTION} label[for]`).click();
    await expect(toggle).toBeChecked();
    expect((await playState(page)).state).toBe("paused");
    await page.locator(`${SECTION} label[for]`).click();
    await expect(toggle).not.toBeChecked();
    await page.mouse.move(0, 0);
    expect((await playState(page)).state).toBe("running");
  });

  test("RF-39 · se pausa y se reanuda con el teclado", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    const toggle = page.getByRole("checkbox", { name: /Pausar la cinta/ });
    await toggle.focus();
    await page.keyboard.press("Space");
    expect((await playState(page)).state).toBe("paused");
    await page.keyboard.press("Space");
    expect((await playState(page)).state).toBe("running");
  });

  test("RF-39 · se pausa mientras el puntero está encima", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chrome");
    await page.goto("/");
    await page.locator(`${SECTION} [data-marquee-viewport]`).hover();
    expect((await playState(page)).state).toBe("paused");
  });

  test("RF-39 · CL-11 · las preguntas se anuncian una sola vez", async ({ page }) => {
    await page.goto("/");
    const items = page.locator(SECTION).getByRole("listitem");
    await expect(items).toHaveCount(questions.length);
  });
});

test.describe("v1.1 · cinta sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("RF-39 · CL-12 · el control de pausa funciona sin JS", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.locator(`${SECTION} label[for]`).click();
    expect((await playState(page)).state).toBe("paused");
  });
});

test.describe("v1.1 · cinta con reducir movimiento", () => {
  test("RF-40 · lista estática, sin animación ni control, con todas las preguntas visibles", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    expect((await playState(page)).name).toBe("none");
    await expect(page.locator(`${SECTION} label[for]`)).toBeHidden();
    await expect(page.locator(`${SECTION} .ld-marquee-copy`)).toBeHidden();
    for (const question of questions) {
      await expect(page.locator(SECTION).getByRole("listitem").filter({ hasText: question })).toBeInViewport({ ratio: 1 }).catch(async () => {
        await page.locator(SECTION).scrollIntoViewIfNeeded();
        await expect(page.locator(SECTION).getByRole("listitem").filter({ hasText: question })).toBeVisible();
      });
    }
    const overflow = await page.locator(`${SECTION} [data-marquee-viewport]`).evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
