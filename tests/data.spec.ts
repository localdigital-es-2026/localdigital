import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { site } from "../src/content/site";
import { SiteDataError, validateSiteData } from "../src/content/validate";
import type { SiteData } from "../src/content/types";

function completeData(overrides: Partial<SiteData> = {}): SiteData {
  return {
    ...site,
    owner: {
      fullName: "Nombre de Ejemplo",
      nif: "00000000T",
      address: "Calle de Ejemplo 1, 28000 Madrid",
      email: "ejemplo@example.com",
    },
    ...overrides,
  };
}

function fieldOf(fn: () => void): string | undefined {
  try {
    fn();
  } catch (error) {
    if (error instanceof SiteDataError) return error.field;
    throw error;
  }
  return undefined;
}

test.describe("Datos comunes", () => {
  test("RNF-07 · los precios, condiciones y plazas se definen una vez con los valores de la spec", () => {
    expect(site.prices).toEqual({
      assistantSetup: 375,
      assistantMonthly: 75,
      web: 449,
      mapsStandalone: 99,
      pilotSetup: 190,
    });
    expect(site.conditions.vat).toBe("IVA no incluido");
    expect(site.conditions.commitment).toBe("Sin permanencia");
    expect(site.conditions.guarantee).toBe(
      "Si en los primeros 60 días no te convence, te devolvemos la instalación.",
    );
    expect(site.pilot).toEqual({ total: 3, remaining: 3 });
    expect(site.phone).toBe("+34 603 03 80 50");
    expect(site.email).toBe("localdigital.es@gmail.com");
    expect(site.bookingUrl).toBe("https://calendly.com/localdigital-es");
    expect(site.retention).toEqual({ leadsMonths: 12, mercantileYears: 6, fiscalYears: 4 });
  });
});

test.describe("Validación de datos", () => {
  test("RF-35 · sin URL de reservas la validación falla indicando el dato", () => {
    const data = completeData({ bookingUrl: "" });
    expect(() => validateSiteData(data)).toThrow(/URL de reservas/);
    expect(fieldOf(() => validateSiteData(data))).toBe("bookingUrl");
  });

  test("RF-35 · una URL de reservas que no es https falla", () => {
    expect(fieldOf(() => validateSiteData(completeData({ bookingUrl: "calendly.com/x" })))).toBe("bookingUrl");
  });

  test("RF-20 · sin datos de la titular la validación falla indicando el campo", () => {
    for (const field of ["fullName", "nif", "address", "email"] as const) {
      const data = completeData();
      data.owner = { ...data.owner, [field]: "" };
      expect(fieldOf(() => validateSiteData(data))).toBe(`owner.${field}`);
    }
  });

  test("RF-35 · con los datos completos la validación no falla", () => {
    expect(() => validateSiteData(completeData())).not.toThrow();
  });

  test("las plazas libres del piloto no pueden superar el total ni ser negativas", () => {
    expect(fieldOf(() => validateSiteData(completeData({ pilot: { total: 3, remaining: 4 } })))).toBe("pilot.remaining");
    expect(fieldOf(() => validateSiteData(completeData({ pilot: { total: 3, remaining: -1 } })))).toBe("pilot.remaining");
  });
});

test.describe("Validación al compilar (T-15)", () => {
  test("RF-20 · RF-35 · los datos reales de site.ts están completos", () => {
    expect(() => validateSiteData(site)).not.toThrow();
  });

  test("RF-35 · la plantilla común valida los datos, así que compilar con datos incompletos falla", () => {
    const layout = readFileSync("src/app/layout.tsx", "utf8");
    expect(layout).toMatch(/import \{ validateSiteData \} from "@\/content\/validate";/);
    expect(layout).toMatch(/^validateSiteData\(site\);$/m);
  });
});
