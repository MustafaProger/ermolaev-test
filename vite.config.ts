import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://igroom.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v2'),
      },
    },
  },
});