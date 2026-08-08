<script setup lang="ts" generic="T extends TableData">
import type { TableColumn, TableData } from "@nuxt/ui";
import type { HeaderContext, SortingState, TableMeta } from "@tanstack/vue-table";
import { computed, h, resolveComponent } from "vue";
import QFailedFetchAlert from "./q-failed-fetch-alert.vue";
import { FAILED_FETCH_TITLE, LOADING_TITLE, EMPTY_TITLE, SORTING_OPTIONS } from "../static/index.ts";

defineOptions({
  name: "q-table",
});

const $props = withDefaults(
  defineProps<{
    /** Column definitions used to render the table. */
    columns: TableColumn<T>[];
    /** Resolved rows, or `undefined` when no view data is available yet. */
    data?: T[];
    /** Whether the query is waiting for its first result. */
    pending: boolean;
    /** Whether a request is currently fetching data. */
    loading: boolean;
    /** Request error to display with a retry action. */
    error?: Error | null;
    /** Message displayed when the resolved data contains no rows. */
    empty?: string;
    /** Title displayed when loading data fails. */
    errorTitle?: string;
  }>(),
  {
    error: null,
    empty: EMPTY_TITLE,
    errorTitle: FAILED_FETCH_TITLE,
  },
);

const $emit = defineEmits<{
  retry: [];
}>();

const sorting = defineModel<SortingState>("sorting", {
  default: () => [],
});

defineSlots<{
  /** Content displayed when the resolved data contains no rows. */
  empty?: () => unknown;
}>();

const UButton = resolveComponent("UButton");

const withSortingHeader = (definition: TableColumn<T>): TableColumn<T> => {
  const label = definition.header;

  if (typeof label !== "string") {
    return definition;
  }

  return {
    ...definition,
    header: ({ column }: HeaderContext<T, unknown>) => {
      if (!column.getCanSort()) {
        return label;
      }

      const direction = column.getIsSorted();

      const icon = direction === "asc" ? "i-lucide-arrow-up" : direction === "desc" ? "i-lucide-arrow-down" : "i-lucide-arrow-up-down";

      return h("div", { class: "flex items-center gap-1" }, [
        h("span", label),
        h(UButton, {
          icon,
          color: "neutral",
          variant: "ghost",
          size: "xs",
          "aria-label": `Sort by ${label}`,
          onClick: () => column.toggleSorting(),
        }),
      ]);
    },
  } as TableColumn<T>;
};

const columns = computed<TableColumn<T>[]>(() => $props.columns.map(withSortingHeader));

const initialLoading = computed(() => $props.pending || ($props.loading && $props.data === undefined));

const refreshing = computed(() => $props.loading && $props.data !== undefined);

const emptyTitle = computed(() => (initialLoading.value ? LOADING_TITLE : $props.empty));

const meta: TableMeta<T> = {
  get refreshing() {
    return refreshing.value;
  },
};

const ui = computed(() => ({
  separator: "z-0",
  thead: "after:z-0",
  tbody: refreshing.value ? "opacity-50 pointer-events-none transition-opacity" : "opacity-100 transition-opacity",
}));
</script>

<template>
  <div class="relative flex min-h-0 grow flex-col overflow-hidden">
    <div
      v-if="$props.error && !initialLoading && !refreshing"
      class="absolute inset-0 z-10 flex items-center justify-center bg-default/75 p-4"
    >
      <QFailedFetchAlert
        class="w-full max-w-xl"
        :error="$props.error"
        :loading="$props.loading"
        :title="$props.errorTitle"
        @retry="$emit('retry')"
      />
    </div>
    <UTable
      v-model:sorting="sorting"
      class="min-h-0 grow overflow-auto"
      :columns="columns"
      :data="$props.data ?? []"
      :sorting-options="SORTING_OPTIONS"
      :loading="initialLoading || refreshing"
      :meta="meta"
      :empty="emptyTitle"
      :ui="ui"
    >
      <template #empty>
        <slot name="empty">{{ emptyTitle }}</slot>
      </template>
    </UTable>
  </div>
</template>
