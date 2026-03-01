<script lang="ts" setup>
import { useSlots } from "vue";
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from "reka-ui";
import { Delays, useUnavailable, type SizeProps, useSize, type DimensionProps, useDimension, type ColorProps } from "~/utils/ui-toolkit";
import { useDebounceFn } from "@vueuse/core";

import type { TooltipSide, TooltipProps, TooltipSlots } from "./../types";

defineOptions({
  name: "q-tooltip",
});

const $props = withDefaults(defineProps<TooltipProps & ColorProps & SizeProps & DimensionProps>(), {
  defer: false,
  layout: "row",
});

defineSlots<TooltipSlots>();

const $slots = useSlots();

const isTooltipVisible = ref(false);

const updateIsTooltipVisible = useDebounceFn(
  () => {
    isTooltipVisible.value = !isTooltipVisible.value;
  },
  computed(() => Delays.MIDDLE_PLUS_DELAY),
);

const { isUnavailable } = useUnavailable();
const { dimensionStyle } = useDimension($props);

const { sizeClasses } = useSize($props);

const { stylizationStyle, contentSide } = useStylization();

function useStylization() {
  const colorVars = computed<{
    "--tooltip-color": string;
    "--tooltip-on-color": string;
  }>(() => {
    switch ($props.color) {
      case "primary":
        return {
          "--tooltip-color": "var(--primary)",
          "--tooltip-on-color": "var(--primary-container)",
        };
      case "primary-container":
        return {
          "--tooltip-color": "var(--primary-container)",
          "--tooltip-on-color": "var(--on-primary-container)",
        };
      case "secondary":
        return {
          "--tooltip-color": "var(--secondary)",
          "--tooltip-on-color": "var(--secondary-container)",
        };
      case "secondary-container":
        return {
          "--tooltip-color": "var(--secondary-container)",
          "--tooltip-on-color": "var(--on-secondary-container)",
        };
      case "tertiary":
        return {
          "--tooltip-color": "var(--tertiary)",
          "--tooltip-on-color": "var(--tertiary-container)",
        };
      case "tertiary-container":
        return {
          "--tooltip-color": "var(--tertiary-container)",
          "--tooltip-on-color": "var(--on-tertiary-container)",
        };
      case "error":
        return {
          "--tooltip-color": "var(--error)",
          "--tooltip-on-color": "var(--error-container)",
        };
      case "error-container":
        return {
          "--tooltip-color": "var(--error-container)",
          "--tooltip-on-color": "var(--on-error-container)",
        };
      default:
        return {
          "--tooltip-color": "#000",
          "--tooltip-on-color": "#000",
        };
    }
  });

  const stylizationStyle = computed(() => {
    return { ...colorVars.value };
  });

  const contentSide = computed<TooltipSide>(() => {
    if ($props.side) {
      return $props.side;
    }

    switch ($props.layout) {
      case "col":
        return "bottom";
      case "col-reverse":
        return "top";
      default:
        return "top";
    }
  });

  return { stylizationStyle, contentSide };
}
</script>

<template>
  <TooltipRoot :open="isTooltipVisible">
    <div
      :class="[
        'tooltip__trigger-wrapper',
        {
          'tooltip__trigger-wrapper_layout-row': $props.layout === 'row',
          'tooltip__trigger-wrapper_layout-col': $props.layout === 'col',
          'tooltip__trigger-wrapper_layout-row-reverse': $props.layout === 'row-reverse',
          'tooltip__trigger-wrapper_layout-col-reverse': $props.layout === 'col-reverse',
        },
      ]"
      :style="dimensionStyle"
    >
      <slot
        name="anchor"
        :layout="$props.layout"
        >TOOLTIP_ANCHOR</slot
      >
      <TooltipTrigger
        v-if="$props.content || $slots.content"
        ref="trigger"
        type="button"
        :class="['tooltip__trigger', ...sizeClasses]"
        :style="stylizationStyle"
        :disabled="isUnavailable"
        @click="updateIsTooltipVisible"
      >
        ?
      </TooltipTrigger>
    </div>
    <TooltipPortal :defer="defer">
      <TooltipContent
        class="tooltip__bubble"
        :style="stylizationStyle"
        :side="contentSide"
        :side-offset="5"
        @escape-key-down="isTooltipVisible = false"
        @pointer-down-outside="updateIsTooltipVisible"
      >
        <slot
          name="content"
          :tooltip="$props.content"
        >
          {{ $props.content }}
        </slot>
        <TooltipArrow
          class="tooltip__arrow"
          :width="12"
          :height="6"
        />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style scoped>
.tooltip__trigger-wrapper {
  display: flex;
  gap: 0.25rem;
}

.tooltip__trigger-wrapper_layout-row {
  flex-direction: row;
}

.tooltip__trigger-wrapper_layout-col {
  flex-direction: column;
}

.tooltip__trigger-wrapper_layout-row-reverse {
  flex-direction: row-reverse;
}

.tooltip__trigger-wrapper_layout-col-reverse {
  flex-direction: column-reverse;
}

.tooltip__trigger {
  cursor: pointer;

  aspect-ratio: 1 / 1;
  width: min-content;
  border: none;
  border-radius: 100%;

  line-height: 1;
  color: var(--tooltip-on-color);

  background: var(--tooltip-color);
}

:deep(.tooltip__bubble) {
  padding: 0.125rem;
  border-radius: var(--radius-sm);

  color: var(--tooltip-on-color);

  background-color: var(--tooltip-color);
  box-shadow: var(--elevation-5);
}

:deep(.tooltip__arrow) {
  fill: var(--tooltip-color);
}
</style>
