<script lang="ts" setup>
import type { PrimitiveProps } from "reka-ui";

import type { DimensionProps, UnavailableProps } from "~uikit/libs/standard";

import type { ToggleCoreProps } from "../composables/use-toggle-core";
import type { CardBaseProps } from "../types";
import QCardBase from "./q-card-base.vue";

defineOptions({
  name: "q-card",
});

const $props = withDefaults(defineProps<CardBaseProps & ToggleCoreProps & DimensionProps & UnavailableProps & PrimitiveProps>(), {
  variant: "filled",
  state: "enabled",
  accessible: true,
  static: false,
  focusIndicator: true,
  as: "div",
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <QCardBase
    v-bind="$props"
    data-qt="q-card-root"
  >
    <slot></slot>
  </QCardBase>
</template>
