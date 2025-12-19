<script lang="ts" setup>
import type { BorderWidth } from '../types';

defineOptions({
  name: "QShapeLoaderBorder"
})

const $props = defineProps<{
  width: number;
  height: number;
  borderWidth: BorderWidth;
  borderRadius: string;
}>()

const { halfPerimeter, animationDur, randomDashoffset } = useStrokeParams( $props )

function useStrokeParams( $props: { width: number; height: number; borderRadius: string; } ) {
  const perimeter = computed(() => Math.ceil($props.width + $props.height) * 2 )
  const halfPerimeter = computed(() => Math.ceil(perimeter.value / 2) )

  // Increase animation duration for large elements to make it softer
  const animationDur = computed(() => {
    if( perimeter.value <= 200) {
      return '1.5s'
    } else if(perimeter.value <= 600) {
      return '3s'
    } else if(perimeter.value <= 1100) {
      return '5s'
    } else {
      return '12s'
    }
  })

  const randomDashoffset = ref(0)

  // the only one way to avoid hydration mismatch
  onMounted(() => {
    // waits for dimension sizes init
    nextTick(() => {
      const sign = Math.floor(Math.random() * 10) % 2 === 0 ? 1 : -1
      randomDashoffset.value = sign * Math.floor(Math.random() * halfPerimeter.value)
    })
  })

  return { halfPerimeter, animationDur, randomDashoffset }
}

</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${$props.width} ${$props.height}`" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" >
      <rect
        x="0"
        y="0"
        :width="$props.width"
        :height="$props.height"
        :rx="$props.borderRadius"
        :ry="$props.borderRadius"
        fill="transparent"
        stroke="currentColor"
        :stroke-width="parseInt($props.borderWidth) + 1"
        :stroke-dasharray="`${halfPerimeter} ${halfPerimeter} ${halfPerimeter}`"
        >
        <animate
          attributeName="stroke-dashoffset"  
          :from="randomDashoffset"
          :to="(-1 * halfPerimeter * 2) + randomDashoffset"
          :dur="animationDur"
          repeatCount="indefinite"
          calcMode="linear"                  
        />
      </rect>
    </svg>
  </div>
</template>
