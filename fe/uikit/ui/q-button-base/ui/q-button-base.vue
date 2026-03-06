<script lang="ts" setup>
import type { SizeProps, UnavailableProps } from "~uikit/libs/standard";
import { QStateLayer } from "~uikit/ui/q-state-layer";
import { QRipple } from "~uikit/ui/q-ripple";

import type { ButtonBaseProps, ButtonBaseVariants } from "../types";

defineOptions({
  name: "q-button-base",
});

const $props = defineProps<
  {
    /** Changes stylization of the button */
    variant: ButtonBaseVariants;
    elevation?: boolean;
  } & Pick<ButtonBaseProps, "type"> &
    SizeProps &
    UnavailableProps
>();
</script>

<template>
  <QStateLayer
    as-child
    :disabled="$props.disabled"
    :elevation="$props.elevation"
  >
    <button
      data-qt="q-button-base-root"
      :class="[
        'button-base',
        {
          'button-base_primary': $props.variant === 'primary',
          'button-base_secondary': $props.variant === 'secondary',
          'button-base_tertiary': $props.variant === 'tertiary',
          'button-base_primary-container': $props.variant === 'primary-container',
          'button-base_secondary-container': $props.variant === 'secondary-container',
          'button-base_tertiary-container': $props.variant === 'tertiary-container',
          'button-base_outline-variant': $props.variant === 'outline-variant',
          'button-base_primary-text': $props.variant === 'primary-text',
          'button-base_inverse-surface': $props.variant === 'inverse-surface',
          'button-base_surface-container-low': $props.variant === 'surface-container-low',
          'button-base_surface-container': $props.variant === 'surface-container',
          'button-base_surface-variant-text': $props.variant === 'surface-variant-text',
        },
      ]"
      :disabled="$props.disabled"
      :type="$props.type"
    >
      <QRipple :disabled="$props.disabled">
        <slot></slot>
      </QRipple>
    </button>
  </QStateLayer>
</template>

<style scoped>
.button-base {
  cursor: pointer;
}

.button-base_primary {
  color: var(--on-primary);
  background-color: var(--primary);
}

.button-base_secondary {
  color: var(--on-secondary);
  background-color: var(--secondary);
}

.button-base_tertiary {
  color: var(--on-tertiary);
  background-color: var(--tertiary);
}

.button-base_primary-container {
  color: var(--on-primary-container);
  background-color: var(--primary-container);
}

.button-base_secondary-container {
  color: var(--on-secondary-container);
  background-color: var(--secondary-container);
}

.button-base_tertiary-container {
  color: var(--on-tertiary-container);
  background-color: var(--tertiary-container);
}

.button-base_outline-variant {
  color: var(--on-surface-variant);
  box-shadow: inset 0 0 0 2px var(--outline-variant);
}

.button-base_primary-text {
  color: var(--primary);
}

.button-base_inverse-surface {
  color: var(--inverse-on-surface);
  background-color: var(--inverse-surface);
}

.button-base_surface-container-low {
  color: var(--primary);
}

.button-base_surface-container {
  color: var(--on-surface-variant);
  background-color: var(--surface-container);
}

.button-base_surface-variant-text {
  color: var(--on-surface-variant);
}

.button-base[disabled] {
  cursor: default;
  color: var(--on-surface);
  background-color: transparent;
}

.button-base[disabled]::before {
  content: "";

  position: absolute;
  inset: 0;

  border-radius: inherit;

  opacity: 0.1;
  background-color: var(--on-surface);
}
</style>
