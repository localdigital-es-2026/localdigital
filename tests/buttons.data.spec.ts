import { readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// RF-46 · El botón secundario solo se muestra cuando existe el número del asistente
// de ejemplo (P-01); hasta entonces se comprueba el componente y quién lo usa.
test.describe("v1.5 · botón secundario", () => {
  test("RF-46 · SecondaryButton es una cápsula transparente con contorno de 1 px del color del texto", () => {
    const source = readFileSync("src/components/layout/SecondaryButton.tsx", "utf8");
    const classes = source.match(/className="([^"]+)"/)![1].split(/\s+/);
    for (const cls of ["rounded-full", "bg-transparent", "border", "border-ink", "min-h-11"]) expect(classes).toContain(cls);
    expect(source).not.toMatch(/bg-btn|bg-accent/);
  });

  test("RF-46 · RF-02 · los enlaces para probar el asistente usan SecondaryButton", () => {
    for (const file of ["src/components/sections/Hero.tsx", "src/components/sections/ChatDemo.tsx"]) {
      const source = readFileSync(file, "utf8");
      expect(source, file).toMatch(/<SecondaryButton href=\{demoUrl\}/);
      expect(source, file).not.toMatch(/<ExternalLink href=\{demoUrl\}/);
    }
  });
});

test("ningún archivo de código o estilos contiene bytes nulos (evita caracteres rotos como «�a0›»)", () => {
  const files = readdirSync("src", { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(tsx?|css)$/.test(entry.name))
    .map((entry) => `${entry.parentPath}/${entry.name}`);
  expect(files.length).toBeGreaterThan(10);
  for (const file of files) expect(readFileSync(file).includes(0), file).toBe(false);
});
