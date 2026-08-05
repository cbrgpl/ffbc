<script lang="ts" setup>
defineOptions({
  name: "q-page-container",
});

const $props = withDefaults(
  defineProps<{
    title?: string;
    view?: "fixed" | "unbound";
  }>(),
  {
    view: "unbound",
  },
);

defineSlots<{
  default?: () => unknown;
  title?: () => unknown;
}>();
</script>

<template>
  <UContainer
    as="section"
    :class="[
      'py-2 px-3 lg:py-8 lg:px-6',
      {
        'flex flex-col grow overflow-auto': $props.view === 'fixed',
      },
    ]"
  >
    <h1
      v-if="$slots.title || $props.title"
      class="mb-6 text-2xl font-bold"
    >
      <slot name="title">{{ $props.title }}</slot>
    </h1>
    <slot></slot>
  </UContainer>
</template>
