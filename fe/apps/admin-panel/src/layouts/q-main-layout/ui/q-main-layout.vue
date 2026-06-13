<script lang="ts" setup>
defineOptions({
  name: "q-main-layout",
});

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <div class="main-layout">
    <UHeader
      :toggle="false"
      class="main-layout__header"
    >
      <template #left></template>
    </UHeader>

    <div class="main-layout__body">
      <USidebar
        collapsible="none"
        class="main-layout__sidebar"
      />

      <UMain class="main-layout__main">
        <RouterView />
      </UMain>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: inherit;
}

.main-layout__header {
  flex-shrink: 0;
}

.main-layout__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.main-layout__sidebar {
  flex-shrink: 0;
}

.main-layout__main {
  flex: 1;
  min-width: 0;
}
</style>
