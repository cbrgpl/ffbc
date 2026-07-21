<script lang="ts" setup>
import { mainLayoutNavigation } from "../static/main-layout-navigation";

defineOptions({
  name: "q-main-sidebar",
});
</script>

<template>
  <USidebar
    collapsible="none"
    :close="false"
    class="main-layout__sidebar"
  >
    <template #header></template>
    <template #default>
      <UNavigationMenu
        :items="mainLayoutNavigation"
        orientation="vertical"
        color="primary"
        :ui="{
          link: 'py-2.5 px-3 border-l border-primary-100 cursor-pointer data-active:cursor-default data-active:border-primary-300 trasnition-all duration-150',
        }"
      />
    </template>
  </USidebar>
</template>
