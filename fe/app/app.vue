<script lang="ts" setup>
import { TooltipProvider } from "reka-ui";

import "./styles/globals.css";
import { cssVars } from "./utils/ui-toolkit";
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
