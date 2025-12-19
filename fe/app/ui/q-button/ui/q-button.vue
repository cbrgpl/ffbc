<script lang="ts" setup>
import { QShapeLoader, type ShapeLoaderProps, type ShapeLoaderSlots, useShapeLoaderProps } from '~/ui/q-shape-loader';
import { useUiContext, type UiProps, useUnavailable, UI_PROP_DEFAULT_V, type SizeProps, useSize, type Sizes } from '~/utils/ui-toolkit';
import { QText } from '~/ui/q-text';
import type { Breakpoints } from '@vueuse/core';

defineOptions({
  name: 'QButton',
  inheritAttrs: false
})

const $props = withDefaults(defineProps<{
  /** Text content */
  text?: string;
  /** Button become width: 100% at fullWidthBreakpoint or fewer */
  fullWidthBreakpoint?: Breakpoints
} & UiProps & SizeProps & Omit<ShapeLoaderProps, 'borderWidth'>>(), {
  loading: UI_PROP_DEFAULT_V,
  disabled: UI_PROP_DEFAULT_V
})

defineSlots<{
  default?: () => unknown;
} & ShapeLoaderSlots>()

const { uloading, ucolor } = useUiContext($props)

const { isUnavailable } = useUnavailable($props)
const { sizeClasses } = useSize($props)

const { shapeLoaderOwnerProps } = useShapeLoaderProps($props)

const loaderSize = computed<Sizes>(() => {
  switch($props.size) {
    case 'lg':
      return 'md'
    case 'md':
      return 'sm'
    default:
      return 'xs'
  }
})

</script>

<template>
  <div >
    <QShapeLoader 
      v-bind="shapeLoaderOwnerProps"
      :class="[...sizeClasses]"
      border-width="3" 
      :loading="uloading ?? false" 
      :size="loaderSize" 
      >
      <template #default>
        <button
        v-bind="$attrs"
        :class="[
        'button',
        {
          'button_primary': ucolor === 'primary',
          'button_secondary': ucolor === 'secondary',
          'button_tertiary': ucolor === 'tertiary',
          'button_error': ucolor === 'error',
          'button_primary-container': ucolor === 'primary-container',
          'button_secondary-container': ucolor === 'secondary-container',
          'button_tertiary-container': ucolor === 'tertiary-container',
          'button_error-container': ucolor === 'error-container',
          'button_loading': loading,
        },
        ]" type="button" :disabled="isUnavailable">
          <QText :lines="1">
            <slot>
              {{ $props.text }}
            </slot>
          </QText>
        </button>
      </template>
      
      <template #tooltip-content="props">
        <slot name="tooltip-content" v-bind="props" />
      </template>
    </QShapeLoader>
  </div>
</template>

<style scoped>

.button {
  position: relative;
  border: 0;
  cursor: pointer;
  background-color: var(--button-background-color);
  border-radius: 0.25em;
  line-height: 1;
  height: 100%;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--button-background-color);
  opacity: 0;
  transition: opacity 120ms ease-out;
  pointer-events: none;
}

.button:not(:disabled):hover::before {
  opacity: var(--layer-opacity-hover);
}

.button:not(:disabled):focus-visible::before {
  opacity: var(--layer-opacity-focus);
}

.button:not(:disabled):active::before {
  opacity: var(_-layer-opacity-active)
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
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
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
  background-color: var(--color-disabled-container);
  color: var(--color-disabled-content);
}

</style>