<script lang="ts" setup>
import { TooltipProvider } from "reka-ui";

import "./styles/globals.css";
import type { Themes } from "./utils/ui-toolkit";
import { cssVars, useUiContext } from "./utils/ui-toolkit";
import { QLayout, vFillLayout } from "./ui/q-layout";

defineOptions({
  name: "app",
  directives: {
    vFillLayout,
  },
});

if (import.meta.client) {
  document.documentElement.classList.add("light");
}

/** mock for global theme */
const theme = ref<Themes>("dark");

useUiContext({ theme });
</script>

<template>
  <QLayout
    id="app"
    as="div"
    :style="cssVars"
  >
    <TooltipProvider>
      <NuxtPage />
    </TooltipProvider>
  </QLayout>
</template>

<style scoped>
#app {
  overflow: auto;
  height: 100%;
}
</style>
