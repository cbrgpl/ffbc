import { computed, watch, type ComputedRef, type Ref } from "vue";

type Dependency<T> = {
  ref: Ref<T> | ComputedRef<T>;
  reset: () => void;
};

type TableViewDependencies = {
  filters?: Dependency<object>;
  sorting?: Dependency<unknown>;
  pagination?: Dependency<object>;
};

/**
 * Keeps dependent table view state consistent: filter changes reset sorting and
 * pagination, while sorting changes reset pagination.
 */
export const useTableDepending = (dependencies: TableViewDependencies) => {
  if (dependencies.filters) {
    const filtersHash = computed(() => JSON.stringify(dependencies.filters?.ref.value ?? {}));

    watch(filtersHash, (newHash, oldHash) => {
      if (newHash !== oldHash) {
        dependencies.sorting?.reset();
        dependencies.pagination?.reset();
      }
    });
  }

  if (dependencies.sorting) {
    const sortingHash = computed(() => JSON.stringify(dependencies.sorting?.ref.value ?? {}));

    watch(sortingHash, (newHash, oldHash) => {
      if (newHash !== oldHash) {
        dependencies.pagination?.reset();
      }
    });
  }

  return {};
};
