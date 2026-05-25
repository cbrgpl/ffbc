import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import nuxtUi from "@nuxt/ui/vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nuxtUi({
      ui: {
        colors: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          info: "info",
          warning: "warning",
          error: "error",
          neutral: "neutral",
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
