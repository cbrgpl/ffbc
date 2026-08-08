<script setup lang="ts" generic="T extends TableData">
import type { TableData } from "@nuxt/ui";
import { computed } from "vue";
import type { QTableColumn } from "../model/q-table-column.ts";

defineOptions({
  name: "q-table-skeleton",
});

const $props = defineProps<{
  columns: QTableColumn<T>[];
  rows: number;
}>();

const rowCount = computed(() => {
  if (!Number.isFinite($props.rows)) {
    return 0;
  }

  return Math.max(0, Math.floor($props.rows));
});

const columnCount = computed(() => Math.max(1, $props.columns.length));
</script>

<template>
  <div class="divide-y divide-default">
    <div
      v-for="rowIndex in rowCount"
      :key="rowIndex"
      class="grid"
      :style="{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }"
    >
      <div
        v-for="(column, columnIndex) in $props.columns"
        :key="columnIndex"
        v-memo="[column, column.skeleton, columnIndex, rowIndex]"
        class="p-4"
      >
        <component
          :is="column.skeleton"
          v-if="column.skeleton"
          v-bind="{
            column,
            columnIndex,
            rowIndex: rowIndex - 1,
          }"
        />
      </div>
    </div>
  </div>
</template>
