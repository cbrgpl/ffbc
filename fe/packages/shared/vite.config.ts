import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import nuxtUi from "@nuxt/ui/vite";
import { nuxtUiConfig } from "./nuxt-ui/config";

export default defineConfig({
  plugins: [
    vue(),
    nuxtUi({
      ...nuxtUiConfig,
      autoImport: {
        dts: "auto-imports.auto.d.ts",
      },
      components: {
        dts: "components.auto.d.ts",
        dirs: "ui",
        excludeNames: [/^(?!U[A-Z]|Router(?:Link|View)$)/],
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL("./index.ts", import.meta.url)),
        "nuxt-ui": fileURLToPath(new URL("./nuxt-ui/index.ts", import.meta.url)),
      },
      fileName: (_, entryName) => `${entryName}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "@vueuse/core", "@nuxt/ui"],
    },
  },
});
