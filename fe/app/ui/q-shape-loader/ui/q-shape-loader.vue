<script lang="ts" setup>
import { useAttrs, useSlots } from 'vue';
import { useElementBounding } from '@vueuse/core'
import QShapeBorder from './q-shape-loader-border.vue';

import { useUiContext, type ColorProps, type LoadingProps, type SizeProps } from '~/utils/ui-toolkit';
import { BORDER_THIN_LINE_FIX_ADD } from '../static';

import { QTooltip, useTooltipProps } from '@/ui/q-tooltip'

import type { ShapeLoaderProps, ShapeLoaderSlots } from './../types'

defineOptions({
  name: 'QShapeLoader'
})

const $props = withDefaults(defineProps<ShapeLoaderProps & ColorProps & LoadingProps & SizeProps>(), {
  borderWidth: '2',
})

defineSlots<{
  default?: () => unknown;
} & ShapeLoaderSlots>()

const $attrs = useAttrs()
const $slots = useSlots()

const loaderEl = useTemplateRef<HTMLDivElement>('loader')
const { shape } = useShape( loaderEl )
const { ucolor } = useUiContext($props)

const { tooltipProps } = useTooltipProps($props)

function useShape(loaderEl: Ref<HTMLDivElement | null>) {
  const shape = ref<{ borderRadius: string; width: number; height: number }>({ borderRadius: 'none', width: -1, height: -1 })

  const loaderFirstChild = computed(() => {
    if(!loaderEl.value || !loaderEl.value.children[0] || !(loaderEl.value.children[0] instanceof HTMLElement)) { return null }
    return loaderEl.value.children[0] ?? null
  })

  const { width, height } = useElementBounding(loaderFirstChild)

  watch(
    () => [ width.value, height.value ] as const,
    ([width, height]) => {
      if( !loaderFirstChild.value ) {
        return
      }

      shape.value.width = width + BORDER_THIN_LINE_FIX_ADD
      shape.value.height = height + BORDER_THIN_LINE_FIX_ADD
    
      // 99.9% cases when borderRadius is changed with dimension size change
      const { borderRadius } = window.getComputedStyle(loaderFirstChild.value)
      shape.value.borderRadius = borderRadius
    }
  )
  
  return {
    shape,
  }
}

</script>

<template>
  <div class="shape-loader">
    <QTooltip v-bind="tooltipProps" :size="$props.size">
      <template #anchor>
        <div ref="loader"
        :style="{ 'border-radius': shape.borderRadius }"
        :class="[
          'shape-loader__inner',
          $attrs?.class,
          {
            'shape-loader_primary': ucolor === 'primary',
            'shape-loader_secondary': ucolor === 'secondary',
            'shape-loader_tertiary': ucolor === 'tertiary',
            'shape-loader_error': ucolor === 'error',
            'shape-loader_primary-container': ucolor === 'primary-container',
            'shape-loader_secondary-container': ucolor === 'secondary-container',
            'shape-loader_tertiary-container': ucolor === 'tertiary-container',
            'shape-loader_error-container': ucolor === 'error-container',
          }
        ]" >
          <slot />
          <template v-if="$props.loading">
            <div class="shape-loader__mask" :style="{ 'border-radius': shape.borderRadius }" />
            <QShapeBorder :style="{ 'border-radius': shape.borderRadius }" class="shape-loader__border" :border-radius="shape.borderRadius" :borderWidth="borderWidth" :width="shape.width" :height="shape.height"/>
          </template>
        </div>
      </template>
      <template v-if="$slots['tooltip-content']" #content>
        <slot name="tooltip-content" />
      </template>
    </QTooltip>
  </div>
</template>

<style scoped>
.shape-loader {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.shape-loader__inner {
  display: inline-block;
  position: relative;
}

.shape-loader_primary {
  color: var(--md-sys-color-primary-container);
}

.shape-loader_secondary {
  color: var(--md-sys-color-secondary-container);
}

.shape-loader_tertiary {
  color: var(--md-sys-color-tertiary-container);
}

.shape-loader_error {
  color: var(--md-sys-color-error-container);
}

.shape-loader_primary-container {
  color: var(--md-sys-color-on-primary-container);
}

.shape-loader_secondary-container {
  color: var(--md-sys-color-on-secondary-container);
}

.shape-loader_tertiary-container {
  color: var(--md-sys-color-on-tertiary-container);
}

.shape-loader_error-container {
  color: var(--md-sys-color-on-error-container);
}

.shape-loader__overlay {
  position: absolute;
  z-index: 0;
  inset: 0;
}

.shape-loader__mask {
  inset: 0;
  
  position: absolute;
  z-index: 0;

  background-color: color-mix(
    in srgb,
    var(--md-sys-color-scrim) 20%,
    transparent
  );
}

.shape-loader__border {
  position: absolute;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  z-index: 0;
  overflow: hidden;
}


</style>
  
