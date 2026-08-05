import { ABORT_ERROR, initAbort } from "@ffbc/shared";
import { ref, shallowRef, toValue, watch, type MaybeRefOrGetter, nextTick } from "vue";
import { usePagination } from "../../q-pagination";
import { useDebounceFn } from "@vueuse/core";

const DEBOUNCE_DELAY = 750;

type FetchResult<T extends object> = { items: T[]; total: number };

type UseTableParams = {
  watchSources: MaybeRefOrGetter<unknown>[];
  onError: (e: Error) => void;
};

type UseTableFetcher<T extends object> = (signal: AbortSignal) => Promise<FetchResult<T>>;

export const useTable = <T extends object>(fetcher: UseTableFetcher<T>, params: UseTableParams) => {
  const items = ref<T[]>([]);
  const itemsAreLoading = shallowRef(true);

  const total = ref(0);
  const { pagination } = usePagination(total);

  const { reassignController } = initAbort();

  const fetchItems = async () => {
    let aborted = false;

    try {
      const signal = reassignController();

      itemsAreLoading.value = true;

      const fetchedData = await fetcher(signal);

      total.value = fetchedData.total;
      items.value = fetchedData.items;
    } catch (e) {
      if (e === ABORT_ERROR) {
        aborted = true;

        return;
      }

      params.onError(new Error("Failed to fetch table items", { cause: e }));
    } finally {
      if (aborted) {
        return;
      }

      itemsAreLoading.value = false;
    }
  };

  watch(
    () => [...params.watchSources.map((src) => toValue(src)), pagination.value],
    useDebounceFn(async () => {
      await nextTick();
      fetchItems();
    }, DEBOUNCE_DELAY),
    { immediate: true },
  );

  return { items, itemsAreLoading, pagination };
};
