import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    {
      // Tests de datos y lógica pura: no necesitan navegador ni se repiten por dispositivo.
      name: "unit",
      testMatch: /data\.spec\.ts/,
    },
    {
      name: "desktop-chrome",
      testIgnore: /data\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      testIgnore: /data\.spec\.ts/,
      use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: `node scripts/serve-out.mjs out`,
    url: `http://localhost:${PORT}/__health`,
    env: { PORT: String(PORT) },
    reuseExistingServer: !process.env.CI,
  },
});
