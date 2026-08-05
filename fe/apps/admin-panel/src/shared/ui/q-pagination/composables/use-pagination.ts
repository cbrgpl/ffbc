import { PER_PAGE_OPTIONS } from "../static";
import type { PaginationModel } from "../model";
import { computed, inject, provide, ref, toValue, type ComputedRef, type InjectionKey, type MaybeRefOrGetter, type Ref } from "vue";

type PaginationContext = {
  pagination: Ref<PaginationModel>;
  total: ComputedRef<number>;
};

const PAGINATION_KEY: InjectionKey<PaginationContext> = Symbol("pagination");

export const usePagination = (total: MaybeRefOrGetter<number>) => {
  const pagination = ref<PaginationModel>({
    page: 1,
    perPage: PER_PAGE_OPTIONS[0],
  });

  provide(PAGINATION_KEY, {
    pagination,
    total: computed(() => toValue(total)),
  });

  return { pagination };
};

export const injectPagination = (): PaginationContext => {
  const context = inject(PAGINATION_KEY);

  if (!context) {
    throw new Error("QPagination must be used in a component that calls usePagination");
  }

  return context;
};
