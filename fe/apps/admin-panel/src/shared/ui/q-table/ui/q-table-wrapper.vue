<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

defineOptions({
  name: "q-table-wrapper",
});

const $props = withDefaults(
  defineProps<{
    searchPlaceholder?: string;
  }>(),
  {
    searchPlaceholder: "Search",
  },
);

const search = defineModel<string>("search");

defineSlots<{
  default?: () => unknown;
}>();

const isDesktop = useBreakpoints(breakpointsTailwind).greaterOrEqual("lg");
</script>

<template>
  <div>
    <UInput
      v-model="search"
      class="mb-2 ml-auto w-full lg:w-auto"
      type="text"
      :size="isDesktop ? 'md' : 'xl'"
      :placeholder="$props.searchPlaceholder"
    />
    <div class="flex flex-col grow">
      <slot></slot>
    </div>
  </div>
</template>
