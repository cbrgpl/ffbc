<script lang="ts" setup>
defineOptions({
  name: "q-fade-transition",
});

withDefaults(
  defineProps<{
    mode?: "default" | "in-out" | "out-in";
    duration?: number;
    appear?: boolean;
  }>(),
  {
    mode: "default",
    duration: 150,
    appear: false,
  },
);

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Transition
    name="q-fade"
    :mode="mode === 'default' ? undefined : mode"
    :appear="appear"
  >
    <slot></slot>
  </Transition>
</template>

<style scoped global>
:global(.q-fade-enter-active),
:global(.q-fade-leave-active) {
  transition: opacity calc(v-bind(duration) * 1ms) ease;
}

:global(.q-fade-enter-from),
:global(.q-fade-leave-to) {
  opacity: 0;
}
</style>
