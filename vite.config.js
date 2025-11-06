import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
    open: true,
  },
  // 👇 Add this block for Vitest integration
  test: {
    environment: 'happy-dom', // simulate browser DOM
    include: ['tests/unit/**/*.spec.{js,ts}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**', '**/tests/**'],
    },
  },
});