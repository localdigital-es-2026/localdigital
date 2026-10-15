import { expect, test } from "@playwright/test";

test.describe("Cabeceras de seguridad", () => {
  for (const path of ["/", "/academias", "/aviso-legal"]) {
    test(`RNF-06 · ${path} envía las cabeceras de la constitución`, async ({ request }) => {
      const headers = (await request.get(path)).headers();
      expect(headers["strict-transport-security"]).toMatch(/max-age=\d{7,}/);
      const csp = headers["content-security-policy"] ?? "";
      expect(csp).toContain("default-src 'self'");
      expect(csp).toMatch(/script-src 'self'( 'sha256-[A-Za-z0-9+/=]+')+/);
      expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
      expect(csp).toContain("frame-ancestors 'none'");
      expect(csp).toContain("form-action 'none'");
      expect(headers["x-frame-options"]).toBe("DENY");
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["permissions-policy"]).toContain("camera=()");
    });
  }

  test("RF-21 · las imágenes para redes se sirven como PNG", async ({ request }) => {
    for (const path of ["/opengraph-image", "/academias/opengraph-image"]) {
      expect((await request.get(path)).headers()["content-type"]).toBe("image/png");
    }
  });

  for (const path of ["/", "/academias"]) {
    test(`RF-26 · con la CSP aplicada ${path} funciona sin violaciones`, async ({ page }, testInfo) => {
      const violations: string[] = [];
      page.on("console", (msg) => {
        if (/Content Security Policy|Refused to/i.test(msg.text())) violations.push(msg.text());
      });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const faq = page.locator("section#faq details").first();
      await faq.locator("summary").click();
      await expect(faq).toHaveAttribute("open", "");
      if (path === "/" && testInfo.project.name === "desktop-chrome") {
        await expect(page.locator("section#inicio canvas")).toBeVisible({ timeout: 15000 });
      }
      if (path === "/" && testInfo.project.name === "mobile") {
        await page.locator("header summary").click();
        await expect(page.locator("header").getByRole("link", { name: "Precios", exact: true })).toBeVisible();
      }
      expect(violations).toEqual([]);
    });
  }
});
