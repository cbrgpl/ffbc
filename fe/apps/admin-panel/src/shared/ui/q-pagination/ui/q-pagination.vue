<script lang="ts" setup>
import { PER_PAGE_OPTIONS } from "../static";
import { injectPagination } from "../composables/use-pagination";
import { computed } from "vue";

defineOptions({
  name: "q-pagination",
});

const $props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const { pagination: model, total } = injectPagination();

const page = computed({
  get: () => model.value.page,
  set: (value: number) => {
    model.value = { ...model.value, page: value };
  },
});

const perPage = computed({
  get: () => model.value.perPage,
  set: (value: number) => {
    model.value = { page: 1, perPage: value };
  },
});
</script>

<template>
  <div class="flex justify-between items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div class="max-w-full overflow-x-auto">
      <UPagination
        v-model:page="page"
        :total="total"
        :items-per-page="perPage"
        :disabled="$props.disabled"
        :sibling-count="1"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-sm whitespace-nowrap text-muted">Rows per page</span>
      <USelect
        v-model="perPage"
        :items="PER_PAGE_OPTIONS as unknown as number[]"
        :disabled="$props.disabled"
        aria-label="Rows per page"
        class="w-24"
      />
    </div>
  </div>
</template>
