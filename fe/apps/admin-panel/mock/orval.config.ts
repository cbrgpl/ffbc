import { defineConfig } from "orval";

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
      mock: {
        generators: [
          {
            type: "msw",
            preferredContentType: "application/json",
          },
        ],
      },
    },
  },
});
