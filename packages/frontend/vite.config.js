import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9001,
  },
  plugins: [vue(), vuetify({ autoImport: true, styles: 'sass' })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
