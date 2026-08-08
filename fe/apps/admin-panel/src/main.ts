import "./app/assets/css/main.css";

import { createApp, type Plugin } from "vue";

import { createPinia } from "pinia";
import { PiniaColada, PiniaColadaQueryHooksPlugin } from "@pinia/colada";
import nuxtUi from "@nuxt/ui/vue-plugin";
import { ABORT_ERROR } from "@ffbc/shared";

import QApp from "./app/q-app.vue";
import router from "./app/router";

import { setupZod } from "./zod.config.ts";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  if (import.meta.env.VITE_API_MOCKING !== "enabled") {
    return;
  }

  const { worker } = await import("./shared/api/mocks/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

setupZod();

const app = createApp(QApp);
const pinia = createPinia();

app.use(pinia as unknown as Plugin);
app.use(router);
app.use(nuxtUi);

app.use(PiniaColada as unknown as Plugin, {
  plugins: [
    PiniaColadaQueryHooksPlugin({
      onError(error, entry) {
        if (error === ABORT_ERROR || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }

        // eslint-disable-next-line no-console
        console.group(`Query failed`);
        console.error(entry.keyHash);
        console.error(error);
        // eslint-disable-next-line no-console
        console.groupEnd();
      },
    }),
  ],
  queryOptions: {
    gcTime: 5 * 60 * 1000,
  },
});

enableMocking().then(() => {
  app.mount("#app");
});
