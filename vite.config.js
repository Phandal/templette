// import { dirname, resolve } from 'node:path';
// import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/templette',
  plugins: [cssInjectedByJsPlugin],
  optimizeDeps: {
    include: ['monaco-editor'],
  },
});
