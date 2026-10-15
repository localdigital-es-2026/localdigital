import { expect, test } from "@playwright/test";

const PAGES = ["/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies", "/no-existe"];

test.describe("Navegación en páginas secundarias", () => {
  for (const path of PAGES) {
    test(`RNF-02 · ${path} tiene menú superior con enlace a la página de inicio`, async ({ page }) => {
      await page.goto(path);
      const home = page.locator("header").getByRole("link", { name: "Local Digital" });
      await expect(home).toBeVisible();
      await expect(home).toHaveAttribute("href", "/");
      await home.click();
      await expect(page).toHaveURL(/\/$/);
    });
  }
});

test.describe("Contenido legal (RF-20)", () => {
  const read = async (page: import("@playwright/test").Page, path: string) => {
    await page.goto(path);
    return (await page.locator("main").innerText()).replace(/ /g, " ");
  };

  test("RF-20 · aviso legal con los datos completos de la titular", async ({ page }) => {
    const text = await read(page, "/aviso-legal");
    for (const fact of [
      "Beatriz Palomo del Pozo",
      "11847771-B",
      "C. Cercedilla, 7, Loc 2, 28400 Collado Villalba, Madrid",
      "localdigital.es@gmail.com",
      "Ley 34/2002",
    ]) {
      expect(text).toContain(fact);
    }
  });

  test("RF-20 · política de privacidad completa y coherente con la web", async ({ page }) => {
    const text = await read(page, "/politica-de-privacidad");
    for (const fact of [
      "Beatriz Palomo del Pozo",
      "Calendly",
      "WhatsApp",
      "Netlify",
      "12 meses",
      "6 años",
      "4 años",
      "acceso",
      "rectificación",
      "supresión",
      "oposición",
      "limitación",
      "portabilidad",
      "Agencia Española de Protección de Datos",
      "retirar el consentimiento",
    ]) {
      expect(text, fact).toContain(fact);
    }
  });

  test("RF-20 · política de cookies: la web no instala cookies no esenciales", async ({ page }) => {
    const text = await read(page, "/politica-de-cookies");
    expect(text).toMatch(/no (utiliza|instala) cookies/i);
    expect(text).toContain("Calendly");
    expect(text).toContain("WhatsApp");
  });

  for (const path of ["/aviso-legal", "/politica-de-privacidad", "/politica-de-cookies"]) {
    test(`RF-20 · ${path} sin restos de la web anterior`, async ({ page }) => {
      const text = await read(page, path);
      for (const old of [/\[COMPLETAR/i, /formulario/i, /Resend/i, /Google Tag Manager/i, /Google Analytics/i]) {
        expect(text).not.toMatch(old);
      }
    });
  }
});
