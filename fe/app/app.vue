<script lang="ts" setup>
import { TooltipProvider } from "reka-ui";

import "~uikit/styles/globals.css";
import { cssVars, useUiContext, type Themes } from "~uikit/libs/standard";
import { QLayout, vFillLayout } from "~uikit/ui/q-layout";

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
