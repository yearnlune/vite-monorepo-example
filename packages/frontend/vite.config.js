import { URL, fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import vuetify from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      port: 9001,
      proxy: {
        '/api': process.env.VITE_EXAMPLE_API || 'http://127.0.0.1:8080/',
      },
    },
    plugins: [
      vue(),
      vuetify({ autoImport: true, styles: 'sass' }),
      EnvironmentPlugin('all'),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  });
};
