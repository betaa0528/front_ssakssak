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
    host: "0.0.0.0",
    port: 21000,
    proxy: {
      "/api": {
        target: "http://localhost:8081/",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  // build: {
  //   outDir: "../ssakssak/src/main/webapp/resources",
  // },
});
