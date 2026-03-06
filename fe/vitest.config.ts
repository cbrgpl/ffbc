import * as path from "node:path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  define: {
    "process.env": {
      VITEST: true,
    },
  },
  test: {
    globals: true,
    coverage: {
      include: ["uikit/**/*.vue", "uikit/libs/**/*.ts"],
      exclude: [
        "uikit/**/types.ts",
        "uikit/**/constants.ts",
        "uikit/**/index.ts",
        "uikit/**/*.constants.ts",
        "uikit/**/examples/**",
        "uikit/**/example.vue",
        "uikit/**/*.example.vue",
      ],
      thresholds: { functions: 5 },
    },
    environment: "happy-dom",
  },
  resolve: {
    alias: {
      "~uikit": path.resolve(__dirname, "uikit"),
    },
  },
});
