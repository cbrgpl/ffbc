<script lang="ts" setup>
import { usePointer } from "@vueuse/core";

defineOptions({
  name: "q-sidebar-button",
});

const { pointerType } = usePointer();
</script>

<template>
  <UTooltip
    text="Toggle sidebar "
    :disabled="pointerType !== 'mouse'"
    :ui="{ content: 'z-60' }"
  >
    <UButton
      icon="i-lucide-menu"
      color="neutral"
      variant="ghost"
    />
  </UTooltip>
</template>
