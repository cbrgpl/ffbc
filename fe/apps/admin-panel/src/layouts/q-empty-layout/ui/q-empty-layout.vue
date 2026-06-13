<script lang="ts" setup>
defineOptions({
  name: "q-empty-layout",
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <UMain class="empty-layout">
    <RouterView />
  </UMain>
</template>

<style scoped>
.empty-layout {
  min-height: 100dvh;
}
</style>
