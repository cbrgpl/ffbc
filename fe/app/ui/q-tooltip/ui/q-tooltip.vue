<script lang="ts" setup>
import { useSlots } from 'vue';
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui'
import { useUiContext, type UiProps, Delays, type DelayProps, type Colors, useUnavailable, type SizeProps, useSize } from '~/utils/ui-toolkit';
import { useDebounceFn } from '@vueuse/core';

import type { TooltipProps, TooltipSlots } from './../types'

defineOptions({
  name: 'QTooltip'
})

const $props = withDefaults(defineProps<TooltipProps & UiProps & DelayProps & SizeProps & TooltipProps>(), {
  defer: false,
  delay: Delays.MIDDLE_DELAY,
  layout: 'row'
})

defineSlots<TooltipSlots>()

const $slots = useSlots()

const isTooltipVisible = ref(false)
const updateIsTooltipVisible = useDebounceFn(
  () => {
    isTooltipVisible.value = !isTooltipVisible.value
  },
  computed(() => $props.delay)
)
const { ucolor } = useUiContext($props, { __debugging: true })
const { isUnavailable } = useUnavailable($props)

const { sizeClasses } = useSize($props, { minSize: 'sm' })

const { stylizationStyle } = useStylization(ucolor)

function useStylization( color: Ref<Colors> ) {

  const colorVars = computed<{
    '--tooltip-color': string;
    '--tooltip-on-color': string;
  }>(() => {
    switch (color.value) {
      case 'primary':
        return {
          '--tooltip-color': 'var(--md-sys-color-primary)',
          '--tooltip-on-color': 'var(--md-sys-color-on-primary)'
        }
      case 'primary-container':
        return {
          '--tooltip-color': 'var(--md-sys-color-primary-container)',
          '--tooltip-on-color': 'var(--md-sys-color-on-primary-container)'
        }
      case 'secondary':
        return {
          '--tooltip-color': 'var(--md-sys-color-secondary)',
          '--tooltip-on-color': 'var(--md-sys-color-on-secondary)'
        }
      case 'secondary-container':
        return {
          '--tooltip-color': 'var(--md-sys-color-secondary-container)',
          '--tooltip-on-color': 'var(--md-sys-color-on-secondary-container)'
        }
      case 'tertiary':
        return {
          '--tooltip-color': 'var(--md-sys-color-tertiary)',
          '--tooltip-on-color': 'var(--md-sys-color-on-tertiary)'
        }
      case 'tertiary-container':
        return {
          '--tooltip-color': 'var(--md-sys-color-tertiary-container)',
          '--tooltip-on-color': 'var(--md-sys-color-on-tertiary-container)'
        }
      case 'error':
        return {
          '--tooltip-color': 'var(--md-sys-color-error)',
          '--tooltip-on-color': 'var(--md-sys-color-on-error)'
        }
      case 'error-container':
        return {
          '--tooltip-color': 'var(--md-sys-color-error-container)',
          '--tooltip-on-color': 'var(--md-sys-color-on-error-container)'
        }
      default:
        return {
          '--tooltip-color': '#000',
          '--tooltip-on-color': '#000'
        }
    }
  })

  const stylizationStyle = computed(() => {
    return colorVars.value
  })


  return { stylizationStyle }
}

</script>

<template>
  <TooltipRoot :open="isTooltipVisible" >
    <div :class="[
      'tooltip__trigger-wrapper',
      {
        'tooltip__trigger-wrapper_layout-row': $props.layout === 'row',
        'tooltip__trigger-wrapper_layout-col': $props.layout === 'col',
        'tooltip__trigger-wrapper_layout-row-reverse': $props.layout === 'row-reverse',
        'tooltip__trigger-wrapper_layout-col-reverse': $props.layout === 'col-reverse',
      }
    ]">
      <slot name="anchor" :layout="$props.layout">TOOLTIP_ANCHOR</slot>
      <TooltipTrigger 
        v-if="$props.content || $slots.content"
        type="button" 
        :class="[
          'tooltip__trigger',
          ...sizeClasses
        ]" 
        :style="stylizationStyle" @click="updateIsTooltipVisible"
        :disabled="isUnavailable"
      >
        ?
      </TooltipTrigger>
    </div>
    <TooltipPortal :defer="defer">
      <TooltipContent class="tooltip__bubble" :style="stylizationStyle">
        <slot name="content" :tooltip="$props.content">
          {{ $props.content }}
        </slot>
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style scoped>
.tooltip {
  --tooltip-color: var(--tooltip-secondary-container);
  --tooltip-on-color: var(--tooltip-on-secondary-container);
}

.tooltip_primary {
  --tooltip-color: var(--md-sys-color-primary);
  --tooltip-on-color: var(--md-sys-color-on-primary);
}

.tooltip_secondary {
  --tooltip-color: var(--md-sys-color-secondary);
  --tooltip-on-color: var(--md-sys-color-on-secondary);
}

.tooltip_tertiary {
  --tooltip-color: var(--md-sys-color-tertiary);
  --tooltip-on-color: var(--md-sys-color-on-tertiary);
}

.tooltip_error {
  --tooltip-color: var(--md-sys-color-error);
  --tooltip-on-color: var(--md-sys-color-on-error);
}

.tooltip_primary-container {
  --tooltip-color: var(--md-sys-color-primary-container);
  --tooltip-on-color: var(--md-sys-color-on-primary-container);
}

.tooltip_secondary-container {
  --tooltip-color: var(--md-sys-color-secondary-container);
  --tooltip-on-color: var(--md-sys-color-on-secondary-container);
}

.tooltip_tertiary-container {
  --tooltip-color: var(--md-sys-color-tertiary-container);
  --tooltip-on-color: var(--md-sys-color-on-tertiary-container);
}

.tooltip_error-container {
  --tooltip-color: var(--md-sys-color-error-container);
  --tooltip-on-color: var(--md-sys-color-on-error-container);
}

.tooltip__trigger-wrapper {
  display: flex;
}

.tooltip__trigger-wrapper_layout-row {
  flex-direction: row;
}

.tooltip__trigger-wrapper_layout-col {
  flex-direction: column
}

.tooltip__trigger-wrapper_layout-row-reverse {
  flex-direction: row-reverse;
}

.tooltip__trigger-wrapper_layout-col-reverse {
  flex-direction: column-reverse;
}

.tooltip__trigger {
  aspect-ratio: 1 / 1;

  color: var(--tooltip-on-color);
  border: 1px solid var(--tooltip-on-color);
  background: var(--tooltip-color);

  border-radius: 100%;
  cursor: pointer;
  line-height: 1;
}

.tooltip__bubble {
  background-color: var(--md-sys-color-secondary-container);
  color: var(--md-sys-color-on-secondary-container);
}
</style>
