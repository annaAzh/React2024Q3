/// <reference types="vitest" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { vitePlugin as remix } from '@remix-run/dev';
import reactVitest from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [
  //   !process.env.VITEST &&
  //     remix({
  //       appDirectory: 'src/app',
  //     }),

  //   tsconfigPaths(),

  // ],
  plugins: [tsconfigPaths(), process.env.VITEST ? reactVitest() : remix({ appDirectory: 'src/app' })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      include: ['**/src/**'],
      exclude: ['**/src/vite-env.d.ts', '**/index.ts'],
    },
  },
});
