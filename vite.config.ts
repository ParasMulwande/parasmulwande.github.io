import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

function removeStylesheetCrossorigin() {
  return {
    name: 'remove-stylesheet-crossorigin',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet" crossorigin href/,
        '<link rel="stylesheet" href'
      );
    },
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), removeStylesheetCrossorigin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
