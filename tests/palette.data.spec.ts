import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : /\.(tsx?|css)$/.test(name) ? [path] : [];
  });
}

// Colores y variables de la paleta A (crema, verde tinta, terracota, salvia, beige del chat).
const OLD = /#(faf7f2|1f2a24|c2562f|5e7d63|f1ebe1|e7e0d4|efe7dc|dcefd9)\b|--ld-(bg|ink|accent|secondary|surface|line)\b|Fraunces/i;

test.describe("v1.2 · sin restos de la paleta A", () => {
  test("RF-28 · RF-36 · RF-29 · el código no usa colores ni variables de la paleta A", () => {
    const offenders = files("src").filter((f) => OLD.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
