<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "reka-ui";
import type { UnavailableProps } from "~uikit/libs/standard";

defineOptions({
  name: "q-state-layer",
});

const $props = defineProps<
  UnavailableProps &
    PrimitiveProps & {
      elevation?: boolean;
    }
>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Primitive
    :as="$props.as"
    :as-child="$props.asChild"
    :class="[
      'state-layer',
      {
        'state-layer_elevation': $props.elevation,
        'state-layer_disabled': $props.disabled,
      },
    ]"
  >
    <slot></slot>
  </Primitive>
</template>

<style scoped>
.state-layer {
  position: relative;
}

.state-layer::after {
  pointer-events: none;
  content: "";

  position: absolute;
  inset: 0;

  border-radius: inherit;

  opacity: 0;
  background-color: currentcolor;

  transition: opacity 120ms ease-in;
}

.state-layer:hover::after {
  opacity: 0.08;
}

.state-layer:focus::after {
  opacity: 0.1;
}

.state-layer:active::after {
  opacity: 0.08;
}

.state-layer_disabled::after {
  display: none;
}

.state-layer_elevation {
  box-shadow: var(--elevation-3);
  transition: box-shadow 85ms;
}

.state-layer_elevation:hover {
  box-shadow: var(--elevation-4);
}

.state-layer_elevation.state-layer_disabled {
  box-shadow: none;
}
</style>
