<script lang="ts" setup>

const $props = defineProps<{
  text?: string;
  lines?: number;
}>()

</script>

<template>
  <p :class="[
    'text',
    {
      'text_clamped': $props.lines
    }
  ]" :style="{ '-webkit-line-clamp': $props.lines }">
    <slot>
      {{ $props.text }}
    </slot>
  </p>
</template>

<style scoped>

.text_clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>