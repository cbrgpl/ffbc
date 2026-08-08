<script setup lang="ts">
defineOptions({
  name: "q-table-pagination-wrapper",
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div class="pagination">
    <slot></slot>
  </div>
</template>

<style scoped>
.pagination {
  position: relative;
  z-index: 1;

  flex-shrink: 0;

  padding-top: 0.75rem;
  border-top: 1px solid var(--ui-border);

  box-shadow: 0 -2px 4px -2px rgb(0 0 0 / 0.15);
}
</style>
