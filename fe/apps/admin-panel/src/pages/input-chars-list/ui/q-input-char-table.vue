<script lang="ts" setup>
import type { InputChar } from "@/entities/input-char/model/input-char";
import { computed, h, ref } from "vue";
import { useQuery } from "@pinia/colada";
import { refDebounced } from "@vueuse/core";
import { QPagination, usePagination } from "@/shared/ui/q-pagination";
import { getInputChars } from "@/entities/input-char/api/get-input-chars";
import type { TableColumn } from "@nuxt/ui";
import type { SortingState } from "@tanstack/vue-table";
import { QInputCharTypeBadge } from "@/entities/input-char/ui/q-input-char-type-badge";

import { QTable, QTableWrapper, useTableDepending } from "@/shared/ui/q-table";

const SEARCH_DEBOUNCE_DELAY = 750;

defineOptions({
  name: "q-input-char-table",
});

const columns: TableColumn<InputChar>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => h(QInputCharTypeBadge, { type: row.original.type }),
    enableSorting: false,
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
  <QTableWrapper
    v-model:search="search"
    class="flex flex-col grow"
  >
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
      <QPagination />
    </template>
  </QTableWrapper>
</template>
