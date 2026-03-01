<script lang="ts" setup>
import { useZIndex } from "./use-z-index";

defineOptions({
  name: "q-z-index-provider",
});

defineSlots<{
  default?: (props: { zIndex: string }) => unknown;
}>();

const [zIndex] = useZIndex();
</script>

<template>
  <slot :z-index="zIndex"></slot>
</template>
