import { defineConfig } from "@playwright/test";

const browsers = ["chromium", "webkit"];
const profiles = [
  { name: "phone", viewport: { width: 390, height: 844 } },
  { name: "ipad-portrait", viewport: { width: 820, height: 1180 } },
  { name: "ipad-landscape", viewport: { width: 1180, height: 820 } },
];

const projects = browsers.flatMap((browserName) =>
  profiles.map((profile) => ({
    name: browserName + "-" + profile.name,
    use: {
      browserName,
      viewport: profile.viewport,
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    },
  }))
);

export default defineConfig({
  testDir: "./tests",
  timeout: 600000,
  expect: { timeout: 15000 },
  fullyParallel: false,
  workers: 1,
  projects,
  use: {
    baseURL: "http://127.0.0.1:4173",
    actionTimeout: 8000,
    navigationTimeout: 15000,
  },
  webServer: {
    command: "python3 -m http.server 4173 --bind 127.0.0.1",
    port: 4173,
    reuseExistingServer: false,
  },
});
