/// <reference types="vitest" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'src/app',
    }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['**/src/**'],
    },
  },
});
