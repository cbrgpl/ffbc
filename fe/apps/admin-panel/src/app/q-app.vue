<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";

defineOptions({
  name: "q-app",
});
</script>

<template>
  <UApp>
    <UMain>
      <RouterView />
    </UMain>
    <PiniaColadaDevtools />
  </UApp>
</template>
