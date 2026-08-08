<script setup lang="ts">
import { useDisplay } from "@/shared/utils/use-display";
import QTablePaginationWrapper from "./q-table-pagination-wrapper.vue";

defineOptions({
  name: "q-table-wrapper",
});

const $props = withDefaults(
  defineProps<{
    searchPlaceholder?: string;
  }>(),
  {
    searchPlaceholder: "Search",
  },
);

const search = defineModel<string>("search");

defineSlots<{
  default?: () => unknown;
  /** Pagination controls displayed below the table. */
  pagination?: () => unknown;
}>();

const { isDesktop } = useDisplay();
</script>

<template>
  <div class="flex min-h-0 grow flex-col">
    <UInput
      v-model="search"
      class="mb-2 ml-auto w-full lg:w-auto"
      type="text"
      :size="isDesktop ? 'md' : 'xl'"
      :placeholder="$props.searchPlaceholder"
    />
    <slot></slot>
    <QTablePaginationWrapper v-if="$slots.pagination">
      <slot name="pagination"></slot>
    </QTablePaginationWrapper>
  </div>
</template>
