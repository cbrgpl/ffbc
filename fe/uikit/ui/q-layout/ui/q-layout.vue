<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui";

defineOptions({
  name: "q-layout",
});

const $props = withDefaults(
  defineProps<
    {
      /** Layout name. Used for debugging */
      name?: string | null;
      /** Enables overflow
       *
       * @default null
       */
      overflow?: "auto" | "hidden" | "visible" | null;
    } & Pick<PrimitiveProps, "as">
  >(),
  {
    name: null,
    overflow: null,
    as: "section",
  },
);
</script>

<template>
  <component
    :is="$props.as"
    :style="{ overflow: $props.overflow }"
    class="layout"
    :data-layout-name="$props.name"
  >
    <slot></slot>
  </component>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
}
</style>
