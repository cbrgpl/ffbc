<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from "reka-ui";
import { ref } from "vue";

defineOptions({
  name: "q-ripple",
});

const $props = withDefaults(
  defineProps<
    PrimitiveProps & {
      /** Disable ripple rendering. */
      disabled?: boolean;
      /** Render ripple from center instead of pointer coordinates. */
      centered?: boolean;
      /** Ripple animation duration in milliseconds. */
      duration?: number;
      /** Max ripple elements rendered at once. */
      maxEffects?: number;
      /** Trigger that should create a ripple. */
      trigger?: "click" | "pointerdown";
      /** Opacity of ripple */
      opacity?: "0.1" | "0.2";
    }
  >(),
  {
    duration: 320,
    maxEffects: 6,
    trigger: "pointerdown",
    opacity: "0.1",
  },
);

defineSlots<{
  default?: () => unknown;
}>();

type RippleEffect = {
  id: number;
  x: string;
  y: string;
  size: string;
};

const effects = ref<RippleEffect[]>([]);
let effectsCounter = 0;

const onEffectEnd = (id: number) => {
  const effectIndex = effects.value.findIndex((effect) => effect.id === id);

  if (effectIndex !== -1) {
    effects.value.splice(effectIndex, 1);
  }
};

const showEffect = (e: MouseEvent | PointerEvent) => {
  if ($props.disabled) {
    return;
  }

  if ("button" in e && e.button !== 0) {
    return;
  }

  const target = e.currentTarget as HTMLElement | null;

  if (!target) {
    return;
  }

  const rect = target.getBoundingClientRect();
  const x = $props.centered ? rect.width / 2 : e.clientX - rect.left;
  const y = $props.centered ? rect.height / 2 : e.clientY - rect.top;
  const size = Math.max(rect.width, rect.height) * 2;

  if (effects.value.length >= $props.maxEffects) {
    effects.value.shift();
  }

  effects.value.push({
    id: effectsCounter++,
    x: `${x}px`,
    y: `${y}px`,
    size: `${size}px`,
  });
};

const onPointerDown = (e: PointerEvent) => {
  if ($props.trigger === "pointerdown") {
    showEffect(e);
  }
};

const onClick = (e: MouseEvent) => {
  if ($props.trigger === "click") {
    showEffect(e);
  }
};
</script>

<template>
  <Primitive
    :as="$props.as"
    :as-child="$props.asChild"
    class="ripple"
    @pointerdown="onPointerDown"
    @click="onClick"
  >
    <slot></slot>
    <span
      v-for="effect of effects"
      :key="effect.id"
      data-qt="q-ripple-effect"
      class="ripple__effect"
      :style="{
        left: effect.x,
        top: effect.y,
        width: effect.size,
        height: effect.size,
        animationDuration: `${$props.duration}ms`,
        opacity: $props.opacity,
      }"
      @animationend="onEffectEnd(effect.id)"
    ></span>
  </Primitive>
</template>

<style scoped>
.ripple {
  isolation: isolate;
  position: relative;
  overflow: hidden;
  border-radius: inherit;
}

.ripple__effect {
  pointer-events: none;

  position: absolute;
  transform-origin: center;
  translate: -50% -50%;
  scale: 0;

  border-radius: 100%;

  background-color: currentcolor;

  animation: ripple ease-out forwards;
}

@keyframes ripple {
  0% {
    scale: 0;
  }

  100% {
    scale: 1;
    opacity: 0;
  }
}
</style>
