<script lang="ts" setup>
import { QLogoutButton } from "@/features/logout";
import { useRouter } from "vue-router";
import QMainSidebar from "./q-main-sidebar.vue";
import QSidebarButton from "./q-sidebar-button.vue";
import { ref } from "vue";

defineOptions({
  name: "q-main-layout",
});

defineSlots<{
  default?: () => unknown;
}>();

const router = useRouter();
const sidebarIsOpened = ref(true);
</script>

<template>
  <div class="main-layout">
    <UHeader
      :toggle="false"
      class="main-layout__header"
    >
      <template #left>
        <QSidebarButton @click="sidebarIsOpened = !sidebarIsOpened" />
        <QLogoutButton
          :label="false"
          @logged-out="router.push({ name: 'Auth' })"
        />
      </template>
    </UHeader>

    <div class="main-layout__body">
      <QMainSidebar
        :open="sidebarIsOpened"
        @update:open="sidebarIsOpened = $event"
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
  height: 100%;
}

.main-layout__header {
  flex-shrink: 0;
}

.main-layout__body {
  display: flex;
  flex: 1;
  min-height: 0;
}

:deep(.main-layout__sidebar) {
  flex-shrink: 0;
  height: 100%;
}

.main-layout__main {
  display: flex;
  flex: 1;
  flex-direction: column;

  min-width: 0;
  min-height: 0;
}
</style>
