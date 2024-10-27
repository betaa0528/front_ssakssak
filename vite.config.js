import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "http://43.200.173.159:8081/backend-1.0-SNAPSHOT",
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
  build: {
    // outDir: '../Board_Backend/src/main/webapp/resources',
    outDir: "dist",
  },
});
