// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port=4173',
    port: 4173,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
