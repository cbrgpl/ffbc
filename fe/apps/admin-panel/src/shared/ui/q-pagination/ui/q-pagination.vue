<script lang="ts" setup>
import { PER_PAGE_OPTIONS } from "../static";
import { injectPagination } from "../composables/use-pagination";
import { computed } from "vue";
import { useDisplay } from "@/shared/utils/use-display";

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

const displayedPage = computed(() => (total.value === 0 ? 0 : page.value));
const totalPages = computed(() => Math.ceil(total.value / perPage.value));
const { isDesktop } = useDisplay();
</script>

<template>
  <div class="flex justify-between gap-3 items-stretch flex-col-reverse lg:flex-row">
    <div class="flex items-center gap-3 min-w-0">
      <div class="max-lg:w-full max-w-full overflow-x-auto">
        <UPagination
          v-model:page="page"
          :total="total"
          :items-per-page="perPage"
          :disabled="$props.disabled"
          :size="isDesktop ? 'md' : 'xl'"
          :sibling-count="isDesktop ? 1 : 0"
          show-edges
          class="max-lg:w-full"
          :ui="{
            list: 'max-lg:w-full',
            first: 'hidden',
            last: 'hidden',
            prev: 'max-lg:h-16 max-lg:min-w-0 max-lg:flex-1 max-lg:justify-center',
            item: 'max-lg:h-16 max-lg:min-w-0 max-lg:flex-1 max-lg:justify-center',
            ellipsis: 'max-lg:h-16 max-lg:min-w-0 max-lg:flex-1 max-lg:justify-center',
            next: 'max-lg:h-16 max-lg:min-w-0 max-lg:flex-1 max-lg:justify-center',
          }"
        />
      </div>
      <span
        v-if="isDesktop"
        class="ml-auto whitespace-nowrap text-muted"
      >
        {{ displayedPage }} of {{ totalPages }} from {{ total }}
      </span>
    </div>

    <div class="flex items-center justify-between">
      <span
        v-if="!isDesktop"
        class="whitespace-nowrap text-muted"
      >
        {{ displayedPage }} of {{ totalPages }} from {{ total }}
      </span>
      <div class="flex items-center gap-2">
        <span class="whitespace-nowrap text-muted">Rows per page</span>
        <USelect
          v-model="perPage"
          :items="PER_PAGE_OPTIONS as unknown as number[]"
          :disabled="$props.disabled"
          aria-label="Rows per page"
          variant="subtle"
          class="w-20"
        />
      </div>
    </div>
  </div>
</template>
