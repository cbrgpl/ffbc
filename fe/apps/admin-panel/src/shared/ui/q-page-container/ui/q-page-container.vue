<script lang="ts" setup>
defineOptions({
  name: "q-page-container",
});

const $props = withDefaults(
  defineProps<{
    view?: "fixed" | "unbound";
  }>(),
  {
    view: "unbound",
  },
);

defineSlots<{
  default?: () => unknown;
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
    <slot></slot>
  </UContainer>
</template>
