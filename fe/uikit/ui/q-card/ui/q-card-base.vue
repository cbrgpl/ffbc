<script lang="ts" setup>
import { computed } from "vue";
import { Primitive, type PrimitiveProps } from "reka-ui";

import { useDimension, useUiContext, type DimensionProps, type UnavailableProps } from "~uikit/libs/standard";

import { useToggleCore, type ToggleCoreProps } from "../composables/use-toggle-core";
import type { CardBaseProps } from "../types";

defineOptions({
  name: "q-card-base",
});

const $props = withDefaults(defineProps<CardBaseProps & ToggleCoreProps & DimensionProps & UnavailableProps & PrimitiveProps>(), {
  variant: "filled",
  state: "enabled",
  accessible: true,
  static: false,
  focusIndicator: true,
  as: "div",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  keydown: [event: KeyboardEvent];
}>();

defineSlots<{
  default?: (props: { disabled: boolean; readonly: boolean; interactive: boolean; state: CardBaseProps["state"] }) => unknown;
}>();

const { context } = useUiContext();
const { dimensionStyle } = useDimension($props);

const isUnavailable = computed(() => {
  return Boolean(context.value.disabled || context.value.readonly);
});

const { isInteractive, forcedState, isStatic } = useToggleCore({
  accessible: () => $props.accessible,
  static: () => $props.static,
  state: () => $props.state,
  unavailable: isUnavailable,
});

const isNativeButton = computed(() => {
  return !$props.asChild && $props.as === "button";
});

const roleAttribute = computed(() => {
  if (isInteractive.value && !isNativeButton.value) {
    return "button";
  }

  return undefined;
});

const tabIndexAttribute = computed(() => {
  if (isInteractive.value && !isNativeButton.value) {
    return 0;
  }

  return undefined;
});

const buttonTypeAttribute = computed(() => {
  if (isNativeButton.value) {
    return "button";
  }

  return undefined;
});

const ariaDisabledAttribute = computed(() => {
  if (isUnavailable.value) {
    return "true";
  }

  return undefined;
});

const onClick = (event: MouseEvent) => {
  if (isUnavailable.value) {
    event.preventDefault();
    event.stopPropagation();

    return;
  }

  emit("click", event);
};

const onKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);

  if (!isInteractive.value || isNativeButton.value || isUnavailable.value) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();

    const target = event.currentTarget as HTMLElement | null;

    target?.click();
  }
};
</script>

<template>
  <Primitive
    data-qt="q-card-base-root"
    :class="[
      'card-base',
      {
        'card-base_variant-outlined': $props.variant === 'outlined',
        'card-base_variant-elevated': $props.variant === 'elevated',
        'card-base_variant-filled': $props.variant === 'filled',
        'card-base_interactive': isInteractive,
        'card-base_static': isStatic,
        'card-base_unavailable': isUnavailable,
        'card-base_state-hovered': forcedState === 'hovered',
        'card-base_state-focused': forcedState === 'focused',
        'card-base_state-pressed': forcedState === 'pressed',
        'card-base_state-dragged': forcedState === 'dragged',
      },
    ]"
    :style="dimensionStyle"
    :as="$props.as"
    :as-child="$props.asChild"
    :role="roleAttribute"
    :tabindex="tabIndexAttribute"
    :aria-disabled="ariaDisabledAttribute"
    :type="buttonTypeAttribute"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot
      :disabled="context.disabled"
      :readonly="context.readonly"
      :interactive="isInteractive"
      :state="forcedState"
    ></slot>
    <div
      class="card-base__state-layer"
      aria-hidden="true"
    ></div>
    <div
      v-if="$props.focusIndicator"
      class="card-base__focus-indicator"
      aria-hidden="true"
    ></div>
  </Primitive>
</template>

<style scoped>
.card-base {
  position: relative;

  overflow: clip;
  display: block;

  width: 22.5rem;
  min-height: 22.5rem;
  border: 1px solid transparent;
  border-radius: var(--radius-md);

  color: var(--on-surface);

  background-color: var(--surface-container-highest);

  transition:
    box-shadow 120ms ease-in,
    background-color 120ms ease-in;
}

.card-base_variant-filled {
  background-color: var(--surface-container-highest);
}

.card-base_variant-elevated {
  background-color: var(--surface-container-low);
  box-shadow: var(--elevation-1);
}

.card-base_variant-outlined {
  border-color: var(--outline-variant);
  background-color: var(--surface);
}

.card-base_interactive {
  cursor: pointer;
}

.card-base_variant-filled.card-base_interactive:hover,
.card-base_variant-outlined.card-base_interactive:hover {
  box-shadow: var(--elevation-1);
}

.card-base_variant-elevated.card-base_interactive:hover {
  box-shadow: var(--elevation-2);
}

.card-base_variant-filled.card-base_interactive:focus-visible,
.card-base_variant-filled.card-base_interactive:active,
.card-base_variant-elevated.card-base_interactive:focus-visible,
.card-base_variant-elevated.card-base_interactive:active {
  box-shadow: var(--elevation-1);
}

.card-base_variant-outlined.card-base_interactive:focus-visible,
.card-base_variant-outlined.card-base_interactive:active {
  box-shadow: none;
}

.card-base_variant-filled.card-base_state-hovered,
.card-base_variant-outlined.card-base_state-hovered {
  box-shadow: var(--elevation-1);
}

.card-base_variant-elevated.card-base_state-hovered {
  box-shadow: var(--elevation-2);
}

.card-base_variant-filled.card-base_state-focused,
.card-base_variant-filled.card-base_state-pressed,
.card-base_variant-elevated.card-base_state-focused,
.card-base_variant-elevated.card-base_state-pressed {
  box-shadow: var(--elevation-1);
}

.card-base_variant-filled.card-base_state-dragged,
.card-base_variant-outlined.card-base_state-dragged {
  box-shadow: var(--elevation-3);
}

.card-base_variant-elevated.card-base_state-dragged {
  box-shadow: var(--elevation-4);
}

.card-base__state-layer {
  pointer-events: none;

  position: absolute;
  inset: 0;

  border-radius: inherit;

  opacity: 0;
  background-color: var(--on-surface);

  transition: opacity 120ms ease-in;
}

.card-base_interactive:hover .card-base__state-layer {
  opacity: 0.08;
}

.card-base_interactive:focus-visible .card-base__state-layer,
.card-base_interactive:active .card-base__state-layer {
  opacity: 0.1;
}

.card-base_state-hovered .card-base__state-layer {
  opacity: 0.08;
}

.card-base_state-focused .card-base__state-layer,
.card-base_state-pressed .card-base__state-layer {
  opacity: 0.1;
}

.card-base_state-dragged .card-base__state-layer {
  opacity: 0.16;
}

.card-base_unavailable .card-base__state-layer {
  display: none;
}

.card-base__focus-indicator {
  pointer-events: none;

  position: absolute;
  inset: -3px;

  display: none;

  border: 3px solid var(--secondary);
  border-radius: 2px;
}

.card-base_interactive:focus-visible .card-base__focus-indicator,
.card-base_static.card-base_state-focused .card-base__focus-indicator {
  display: block;
}
</style>
