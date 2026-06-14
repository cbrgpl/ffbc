import { defineConfig } from "orval";

const randomDelay = () => 1000 + (5000 - 1000) * Math.random();

export default defineConfig({
  api: {
    input: {
      target: "./swagger.yaml",
    },
    output: {
      mode: "single",
      target: "./../src/shared/api/generated/api.ts",
      schemas: "./../src/shared/api/generated/model",
      client: "fetch",
      baseUrl: {
        runtime: "import.meta.env.VITE_BE_URL",
      },
      override: {
        requestOptions: {
          credentials: "include",
        },
      },
      mock: {
        generators: [
          {
            type: "msw",
            preferredContentType: "application/json",
            delay: randomDelay,
            delayFunctionLazyExecute: true,
          },
        ],
      },
    },
  },
});
