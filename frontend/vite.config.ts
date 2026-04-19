import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Vite configuration for Vue 3 development and production builds
 */
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: 'localhost',
  },
});
