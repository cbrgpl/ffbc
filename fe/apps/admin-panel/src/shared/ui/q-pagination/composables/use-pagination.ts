import { PER_PAGE_OPTIONS } from "../static";
import type { PaginationModel } from "../model";
import { inject, provide, readonly, ref, toValue, watch, type InjectionKey, type MaybeRefOrGetter, type Ref } from "vue";

type PaginationContext = {
  pagination: Ref<PaginationModel>;
  total: Readonly<Ref<number, number>>;
};

const PAGINATION_KEY: InjectionKey<PaginationContext> = Symbol("pagination");

export const usePagination = () => {
  const pagination = ref<PaginationModel>({
    page: 1,
    perPage: PER_PAGE_OPTIONS[0],
  });

  let lastTotal: number = 0;

  const initPagination = (total: MaybeRefOrGetter<number | null>) => {
    const totalLc = ref(0);

    watch(
      () => toValue(total),
      (total) => {
        totalLc.value = total ?? lastTotal;

        if (typeof total === "number") {
          lastTotal = total;
        }
      },
      { immediate: true },
    );

    provide(PAGINATION_KEY, {
      pagination,
      total: readonly(totalLc),
    });
  };

  return { pagination, initPagination };
};

export const injectPagination = (): PaginationContext => {
  const context = inject(PAGINATION_KEY);

  if (!context) {
    throw new Error("QPagination must be used in a component that calls usePagination");
  }

  return context;
};
