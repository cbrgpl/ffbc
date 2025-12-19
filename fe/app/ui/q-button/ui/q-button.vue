<script lang="ts" setup>
import { QShapeLoader, type ShapeLoaderProps, type ShapeLoaderSlots, useShapeLoaderProps } from "~/ui/q-shape-loader";
import {
  useUiContext,
  type UiProps,
  useUnavailable,
  UI_PROP_DEFAULT_V,
  type SizeProps,
  useSize,
  type Sizes,
  useDimension,
  type DimensionProps,
} from "~/utils/ui-toolkit";
import { QText } from "~/ui/q-text";

defineOptions({
  name: "q-button",
  inheritAttrs: false,
});

const $props = withDefaults(
  defineProps<
    {
      /** Text content */
      text?: string;
    } & UiProps &
      SizeProps &
      Omit<ShapeLoaderProps, "borderWidth"> &
      DimensionProps
  >(),
  {
    loading: UI_PROP_DEFAULT_V,
    disabled: UI_PROP_DEFAULT_V,
  },
);

defineSlots<
  {
    default?: () => unknown;
  } & ShapeLoaderSlots
>();

const { uloading, ucolor } = useUiContext($props);

const { isUnavailable } = useUnavailable($props);
const { sizeClasses } = useSize($props);
const { dimensionStyle } = useDimension($props);

const { shapeLoaderOwnerProps } = useShapeLoaderProps($props);

const loaderSize = computed<Sizes>(() => {
  switch ($props.size) {
    case "lg":
      return "md";
    case "md":
      return "sm";
    default:
      return "xs";
  }
});
</script>

<template>
  <div :style="dimensionStyle">
    <QShapeLoader
      width="100%"
      v-bind="shapeLoaderOwnerProps"
      border-width="3"
      :loading="uloading ?? false"
      :size="loaderSize"
    >
      <template #default>
        <button
          v-bind="$attrs"
          :class="[
            'button',
            ...sizeClasses,
            {
              button_primary: ucolor === 'primary',
              button_secondary: ucolor === 'secondary',
              button_tertiary: ucolor === 'tertiary',
              button_error: ucolor === 'error',
              'button_primary-container': ucolor === 'primary-container',
              'button_secondary-container': ucolor === 'secondary-container',
              'button_tertiary-container': ucolor === 'tertiary-container',
              'button_error-container': ucolor === 'error-container',
              button_loading: loading,
            },
          ]"
          type="button"
          :disabled="isUnavailable"
        >
          <QText :lines="1">
            <slot>
              {{ $props.text }}
            </slot>
          </QText>
        </button>
      </template>

      <template #tooltip-content="props">
        <slot
          name="tooltip-content"
          v-bind="props"
        ></slot>
      </template>
    </QShapeLoader>
  </div>
</template>

<style scoped>
.button {
  cursor: pointer;

  position: relative;

  width: 100%;
  border: 0;
  border-radius: 0.25em;

  line-height: 1;

  background-color: var(--button-background-color);
}

.button::before {
  pointer-events: none;
  content: "";

  position: absolute;
  inset: 0;

  opacity: 0;
  background-color: var(--button-background-color);

  transition: opacity 120ms ease-out;
}

.button:not(:disabled):hover::before {
  opacity: var(--layer-opacity-hover);
}

.button:not(:disabled):focus-visible::before {
  opacity: var(--layer-opacity-focus);
}

.button:not(:disabled):active::before {
  opacity: var(_-layer-opacity-active);
}

.button_primary {
  --button-background-color: var(--md-sys-color-primary);

  color: var(--md-sys-color-on-primary);
}

.button_secondary {
  --button-background-color: var(--md-sys-color-secondary);

  color: var(--md-sys-color-on-secondary);
}

.button_tertiary {
  --button-background-color: var(--md-sys-color-tertiary-container);

  color: var(--md-sys-color-on-tertiary-container);
}

.button_error {
  --button-background-color: var(--md-sys-color-error);

  color: var(--md-sys-color-on-error);
}

.button_primary-container {
  --button-background-color: var(--md-sys-color-primary-container);

  color: var(--md-sys-color-on-primary-container);
}

.button_secondary-container {
  --button-background-color: var(--md-sys-color-secondary-container);

  color: var(--md-sys-color-on-secondary-container);
}

.button_error-container {
  --button-background-color: var(--md-sys-color-error-container);

  color: var(--md-sys-color-on-error-container);
}

.button__loader-wrapper {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.button_xs {
  height: var(--xs);
  padding: 0.25rem;
}

.button_sm {
  height: var(--md);
  padding: 0.375rem;
}

.button_md {
  height: var(--md);
  padding: 0.5rem;
}

.button_lg {
  height: var(--md);
  padding: 0.75rem;
}

.button_loading {
  pointer-events: none;
}

.button[disabled] {
  color: var(--color-disabled-content);
  background-color: var(--color-disabled-container);
}
</style>
