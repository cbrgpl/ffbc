import type { NuxtUIOptions } from "@nuxt/ui/vite";

export const nuxtUiConfig = {
  theme: {
    colors: ["primary", "secondary", "success", "info", "warning", "error"],
  },
  ui: {
    colors: {
      primary: "primary",
      secondary: "secondary",
      success: "success",
      info: "info",
      warning: "warning",
      error: "error",
      neutral: "neutral",
      test: "sadas",
    },
  },
} satisfies NuxtUIOptions;
