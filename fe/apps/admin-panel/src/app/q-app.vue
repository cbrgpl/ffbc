<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";

import { registerCleanupableStore, useSession, useSessionStore, type CleanupableStore } from "@/entities/session";

defineOptions({
  name: "q-app",
});

const { initSession } = useSession();
useCleanup();

initSession();

function useCleanup() {
  const cleanupableStores: Array<() => CleanupableStore> = [useSessionStore];
  cleanupableStores.forEach((useStore) => registerCleanupableStore(useStore()));

  return {};
}
</script>

<template>
  <UApp>
    <UMain>
      <RouterView />
    </UMain>
    <PiniaColadaDevtools />
  </UApp>
</template>
