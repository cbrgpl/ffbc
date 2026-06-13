import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import nuxtUi from "@nuxt/ui/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import Icons from "unplugin-icons/vite";
import { nuxtUiConfig } from "@ffbc/shared/nuxt-ui";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    nuxtUi({
      ...nuxtUiConfig,
      autoImport: {
        dts: "auto-imports.auto.d.ts",
        dirs: ["src"],
      },
      components: {
        dts: "components.auto.d.ts",
        dirs: "src",
        excludeNames: [/^(?!U[A-Z]|Router(?:Link|View)$)/],
      },
    }),
    Icons({}),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
