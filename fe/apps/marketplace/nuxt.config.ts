import path from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  build: {
    transpile: ["@ffbc/shared"],
  },

  app: {
    rootAttrs: {
      id: "nuxt-root",
    },
  },

  dir: {
    pages: "routes",
  },

  devServer: {
    port: 3001,
  },

  vite: {
    server: {
      fs: {
        allow: [path.resolve(__dirname, "../..")],
      },
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/scripts", "@nuxt/test-utils", "@nuxtjs/i18n", "@pinia/nuxt"],

  // icon: {
  //   serverBundle: "local",
  //   fallbackToApi: false,
  //   customCollections: [{ prefix: "lc", dir: "./app/assets/icons" }],
  // },

  experimental: {
    typedPages: true,
  },

  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "ru", language: "ru-RU" },
    ],
    defaultLocale: "en",
  },

  alias: {
    // "~uikit": path.resolve(__dirname, "uikit"),
  },
});
