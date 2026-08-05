<script lang="ts" setup>
import type { InputChar } from "@/entities/input-char/model/input-char";
import { h, ref } from "vue";
import { QPagination } from "@/shared/ui/q-pagination";
import { getInputChars } from "@/entities/input-char/api/get-input-chars";
import type { TableColumn } from "@nuxt/ui";
import { QInputCharTypeBadge } from "@/entities/input-char/ui/q-input-char-type-badge";

import { getTableProps, QTableWrapper, useTable } from "@/shared/ui/q-table";

defineOptions({
  name: "q-input-char-table",
});

const columns: TableColumn<InputChar>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => h(QInputCharTypeBadge, { type: row.original.type }),
  },
];

const search = ref("");

const { items, itemsAreLoading, pagination } = useTable<InputChar>(
  (signal) => {
    const res = getInputChars({
      search: search.value,
      pagination: pagination.value,
      signal,
    });

    return res;
  },
  {
    watchSources: [search],
    onError: (e) => {
      console.error(e);
    },
  },
);

const { emptyTitle, ui } = getTableProps(itemsAreLoading);
</script>

<template>
  <QTableWrapper
    v-model:search="search"
    class="flex flex-col grow"
  >
    <template #default>
      <UTable
        class="grow"
        :columns="columns"
        :data="items"
        :loading="itemsAreLoading"
        :empty="emptyTitle"
        :ui="ui"
      />
      <QPagination />
    </template>
  </QTableWrapper>
</template>
