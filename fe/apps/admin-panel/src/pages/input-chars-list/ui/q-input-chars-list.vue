<script lang="ts" setup>
import { QPageContainer } from "@/shared/ui/q-page-container/index.ts";
import QInputCharTable from "./q-input-char-table.vue";

defineOptions({
  name: "q-input-chars-list",
});
</script>

<template>
  <QPageContainer
    title="Input characteristics"
    scroll="content"
  >
    <QInputCharTable />
  </QPageContainer>
</template>
