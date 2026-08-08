<script lang="ts" setup>
import { ref } from "vue";
import { QPageContainer } from "@/shared/ui/q-page-container";

defineOptions({
  name: "q-home",
});

const text = ref("");
</script>

<template>
  <QPageContainer
    title="Page scroll demo"
    scroll="page"
  >
    <UTextarea
      v-model="text"
      autoresize
      :rows="12"
      class="w-full"
      placeholder="Paste large text here"
    />
  </QPageContainer>
</template>
