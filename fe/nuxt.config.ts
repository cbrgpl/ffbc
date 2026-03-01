import path from "node:path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

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

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "reka-ui/nuxt",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
  ],

  icon: {
    serverBundle: "local",
    fallbackToApi: false,
    customCollections: [{ prefix: "lc", dir: "./app/assets/icons" }],
  },

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
    "~admina": path.resolve(__dirname, "app", "admina"),
    "~shop": path.resolve(__dirname, "app", "shop"),
    "~utils": path.resolve(__dirname, "app", "utils"),
    "~ui": path.resolve(__dirname, "app", "ui"),
  },
});
