<script lang="ts" setup>
defineOptions({
  name: "q-page-container",
});

const $props = withDefaults(
  defineProps<{
    title?: string;
    /** `content` fills available height and scrolls its content; `page` lets the app main area scroll. */
    scroll?: "content" | "page";
  }>(),
  {
    scroll: "page",
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
        'flex min-h-0 grow flex-col overflow-hidden': $props.scroll === 'content',
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
