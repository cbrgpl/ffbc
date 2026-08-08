<script lang="ts" setup>
import type { InputChar } from "@/entities/input-char/model/input-char";
import { computed, h, ref, resolveComponent } from "vue";
import { useQuery } from "@pinia/colada";
import { refDebounced } from "@vueuse/core";
import { QPagination, usePagination } from "@/shared/ui/q-pagination";
import { getInputChars } from "@/entities/input-char/api/get-input-chars";
import type { SortingState } from "@tanstack/vue-table";
import { QInputCharTypeBadge } from "@/entities/input-char/ui/q-input-char-type-badge";

import { QTable, QTableWrapper, useTableDepending, type QTableColumn } from "@/shared/ui/q-table";

const SEARCH_DEBOUNCE_DELAY = 750;

defineOptions({
  name: "q-input-char-table",
});

const USkeleton = resolveComponent("USkeleton");

const columns: QTableColumn<InputChar>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
    enableSorting: false,
    skeleton: () => h(USkeleton, { class: "h-4 w-full" }),
  },
  {
    accessorKey: "name",
    header: "Name",
    skeleton: ({ rowIndex }) =>
      h(USkeleton, {
        class: ["h-4", rowIndex % 2 === 0 ? "w-4/5" : "w-3/5"],
      }),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => h(QInputCharTypeBadge, { type: row.original.type }),
    enableSorting: false,
    skeleton: () => h(USkeleton, { class: "h-5 w-16 rounded-full" }),
  },
];

const search = ref("");
const sorting = ref<SortingState>([]);
const debouncedSearch = refDebounced(search, SEARCH_DEBOUNCE_DELAY);
const { pagination, initPagination } = usePagination();

const { data, isLoading, error, refetch, isPending } = useQuery({
  key: () => [
    "input-chars",
    {
      search: debouncedSearch.value,
      page: pagination.value.page,
      perPage: pagination.value.perPage,
    },
  ],
  query: ({ signal }) =>
    getInputChars({
      search: debouncedSearch.value,
      pagination: pagination.value,
      signal,
    }),
  placeholderData: (previousData) => previousData,
});

initPagination(() => data.value?.total ?? null);

useTableDepending({
  filters: {
    ref: computed(() => ({ search: search.value })),
    reset: () => {},
  },
  sorting: {
    ref: sorting,
    reset: () => {
      sorting.value = [];
    },
  },
  pagination: {
    ref: pagination,
    reset: () => {
      pagination.value.page = 1;
    },
  },
});
</script>

<template>
  <QTableWrapper v-model:search="search">
    <template #default>
      <QTable
        v-model:sorting="sorting"
        :columns="columns"
        :data="data?.items"
        :pending="isPending"
        :loading="isLoading"
        :error="error"
        empty="There is no input characteristics yet"
        error-title="Failed to load input characteristics"
        @retry="refetch()"
      />
    </template>
    <template #pagination>
      <QPagination />
    </template>
  </QTableWrapper>
</template>
