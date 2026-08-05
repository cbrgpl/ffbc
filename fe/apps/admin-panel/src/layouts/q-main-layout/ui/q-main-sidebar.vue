<script lang="ts" setup>
import { useRoute } from "vue-router";
import { mainLayoutNavigation, MainLayoutRouteNames } from "../static/main-layout-navigation";
import { watch } from "vue";

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

watch(
  () => currentRoute.matched,
  (matched) => {
    const newActiveOption = matched.find((match) => typeof match.name === "string" && isMainLayoutRoute(match.name))?.name ?? null;

    if (newActiveOption === null) {
      return;
    } else if (newActiveOption !== oldActiveOption) {
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
    class="main-layout__sidebar"
    @update:open="$emit('update:open', $event)"
  >
    <template #header></template>
    <template #default="{ state }">
      <UNavigationMenu
        :items="mainLayoutNavigation"
        orientation="vertical"
        color="primary"
        :collapsed="state === 'collapsed'"
        :ui="{
          link: 'border-l border-primary-100 cursor-pointer data-active:cursor-default data-active:border-primary-300 trasnition-all duration-150',
        }"
      />
    </template>
  </USidebar>
</template>
