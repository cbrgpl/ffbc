<script setup lang="ts">
import { PiniaColadaDevtools } from "@pinia/colada-devtools";

defineOptions({
  name: "app",
});
</script>

<template>
  <UApp>
    <RouterView />
    <PiniaColadaDevtools />
  </UApp>
</template>
