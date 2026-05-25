import "./app/assets/css/main.css";

import { createApp, type Plugin } from "vue";

import { createPinia } from "pinia";
import { PiniaColada } from "@pinia/colada";
import nuxtUi from "@nuxt/ui/vue-plugin";

import App from "./app/App.vue";
import router from "./app/router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia as unknown as Plugin);
app.use(router);
app.use(nuxtUi);

app.use(PiniaColada as unknown as Plugin, {
  queryOptions: {
    gcTime: 5 * 60 * 1000,
  },
});

app.mount("#app");
