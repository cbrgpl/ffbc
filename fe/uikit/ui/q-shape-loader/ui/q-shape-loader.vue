<script lang="ts" setup>
import { useSlots } from "vue";
import { useElementBounding } from "@vueuse/core";
import QShapeBorder from "./q-shape-loader-border.vue";

import { useDimension, type ColorProps, type DimensionProps, type LoadingProps, type SizeProps } from "~uikit/libs/standard";
import { BORDER_THIN_LINE_FIX_ADD } from "../static";

import { QTooltip, useTooltipProps } from "@/ui/q-tooltip";

import type { ShapeLoaderProps, ShapeLoaderSlots } from "./../types";

defineOptions({
  name: "q-shape-loader",
});

const $props = withDefaults(defineProps<ShapeLoaderProps & ColorProps & LoadingProps & SizeProps & DimensionProps>(), {
  borderWidth: "2",
});

defineSlots<
  {
    default?: () => unknown;
  } & ShapeLoaderSlots
>();

const $slots = useSlots();

const loaderEl = useTemplateRef<HTMLDivElement>("loader");
const { shape } = useShape(loaderEl);

const { tooltipProps } = useTooltipProps($props);
const { dimensionStyle } = useDimension($props);

function useShape(loaderEl: Ref<HTMLDivElement | null>) {
  const shape = ref<{ borderRadius: string; width: number; height: number }>({ borderRadius: "none", width: -1, height: -1 });

  const loaderFirstChild = computed(() => {
    if (!loaderEl.value || !loaderEl.value.children[0] || !(loaderEl.value.children[0] instanceof HTMLElement)) {
      return null;
    }

    return loaderEl.value.children[0] ?? null;
  });

  const { width, height } = useElementBounding(loaderFirstChild);

  watch(
    () => [width.value, height.value] as const,
    ([width, height]) => {
      if (!loaderFirstChild.value) {
        return;
      }

      shape.value.width = width + BORDER_THIN_LINE_FIX_ADD;
      shape.value.height = height + BORDER_THIN_LINE_FIX_ADD;

      // 99.9% cases when borderRadius is changed with dimension size change
      const { borderRadius } = window.getComputedStyle(loaderFirstChild.value);
      shape.value.borderRadius = borderRadius;
    },
  );

  return {
    shape,
  };
}
</script>

<template>
  <div
    class="shape-loader"
    :style="dimensionStyle"
  >
    <QTooltip
      v-bind="tooltipProps"
      :size="$props.size"
      width="100%"
      :color="$props.color"
    >
      <template #anchor>
        <div
          ref="loader"
          :style="{ 'border-radius': shape.borderRadius }"
          :class="[
            'shape-loader__inner',
            {
              'shape-loader_primary': $props.color === 'primary',
              'shape-loader_secondary': $props.color === 'secondary',
              'shape-loader_tertiary': $props.color === 'tertiary',
              'shape-loader_error': $props.color === 'error',
              'shape-loader_primary-container': $props.color === 'primary-container',
              'shape-loader_secondary-container': $props.color === 'secondary-container',
              'shape-loader_tertiary-container': $props.color === 'tertiary-container',
              'shape-loader_error-container': $props.color === 'error-container',
            },
          ]"
        >
          <slot></slot>
          <template v-if="$props.loading">
            <div
              class="shape-loader__mask"
              :style="{ 'border-radius': shape.borderRadius }"
            ></div>
            <QShapeBorder
              :style="{ 'border-radius': shape.borderRadius }"
              class="shape-loader__border"
              :border-radius="shape.borderRadius"
              :border-width="borderWidth"
              :width="shape.width"
              :height="shape.height"
            />
          </template>
        </div>
      </template>
      <template
        v-if="$slots['tooltip-content']"
        #content
      >
        <slot name="tooltip-content"></slot>
      </template>
    </QTooltip>
  </div>
</template>

<style scoped>
.shape-loader {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.shape-loader__inner {
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.shape-loader_primary {
  color: var(--primary-container);
}

.shape-loader_secondary {
  color: var(--secondary-container);
}

.shape-loader_tertiary {
  color: var(--tertiary-container);
}

.shape-loader_error {
  color: var(--error-container);
}

.shape-loader_primary-container {
  color: var(--on-primary-container);
}

.shape-loader_secondary-container {
  color: var(--on-secondary-container);
}

.shape-loader_tertiary-container {
  color: var(--on-tertiary-container);
}

.shape-loader_error-container {
  color: var(--on-error-container);
}

.shape-loader__overlay {
  position: absolute;
  z-index: 0;
  inset: 0;
}

.shape-loader__mask {
  position: absolute;
  z-index: 0;
  inset: 0;
  background-color: color-mix(in srgb, var(--scrim) 20%, transparent);
}

.shape-loader__border {
  position: absolute;
  z-index: 0;
  top: -1px;
  left: -1px;

  overflow: hidden;

  width: calc(100% + 2px);
  height: calc(100% + 2px);
}
</style>
