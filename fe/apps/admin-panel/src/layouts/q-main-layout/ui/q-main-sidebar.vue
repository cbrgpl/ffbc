<script lang="ts" setup>
import { useRoute } from "vue-router";
import { mainLayoutNavigation, MainLayoutRouteNames } from "../static/main-layout-navigation";
import { watch } from "vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

defineOptions({
  name: "q-main-sidebar",
});

const $props = defineProps<{
  open: boolean;
}>();

const $emit = defineEmits<{
  "update:open": [state: boolean];
}>();

const currentRoute = useRoute();
let oldActiveOption: null | MainLayoutRouteNames = null;

const isMainLayoutRoute = (name: string) => {
  return (
    name === MainLayoutRouteNames.CATEGORIES ||
    name === MainLayoutRouteNames.HOME ||
    name === MainLayoutRouteNames.INPUT_CHARACTERISTICS ||
    name === MainLayoutRouteNames.SERVICES ||
    name === MainLayoutRouteNames.TEMPLATES
  );
};

const isMobile = useBreakpoints(breakpointsTailwind).smaller("lg");

watch(
  () => currentRoute.matched,
  (matched) => {
    const newActiveOption = matched.find((match) => typeof match.name === "string" && isMainLayoutRoute(match.name))?.name ?? null;

    if (newActiveOption === null) {
      return;
    } else if (newActiveOption !== oldActiveOption && isMobile.value) {
      oldActiveOption = newActiveOption as MainLayoutRouteNames;
      $emit("update:open", false);
    }
  },
);
</script>

<template>
  <USidebar
    collapsible="icon"
    :close="false"
    :open="$props.open"
    class="z-0"
    @update:open="$emit('update:open', $event)"
  >
    <template #header></template>
    <template #default="{ state }">
      <UNavigationMenu
        :items="mainLayoutNavigation"
        orientation="vertical"
        color="secondary"
        :collapsed="state === 'collapsed'"
        popover
        :ui="{
          link: 'border-l border-secondary-100 cursor-pointer data-active:cursor-default data-active:border-secondary-300 trasnition-all duration-150',
          childList: 'border-0',
        }"
      />
    </template>
  </USidebar>
</template>
