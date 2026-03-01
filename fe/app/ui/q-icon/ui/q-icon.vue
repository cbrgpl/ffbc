<script lang="ts" setup>
import type { ColorProps } from "~/utils/ui-toolkit";
import type { Icons } from "../types";

defineOptions({
  name: "q-icon",
});

const $props = defineProps<
  {
    name: Icons;
  } & Pick<ColorProps, "color">
>();

const icon = computed(() => `lc:${$props.name.replaceAll("_", "-")}`);
</script>

<template>
  <Icon
    :name="icon"
    mode="svg"
    :class="icon"
  />
</template>
