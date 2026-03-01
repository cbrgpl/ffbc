import { type InjectionKey, toValue, computed } from "vue";

export const useProvide = <T>(key: InjectionKey<T>, v: MaybeRefOrGetter<T>) => {
  provide(key, computed(() => toValue(v)) as T);
};

export const useInjection = <T>(key: InjectionKey<T>) => {
  const injectedV = inject(key, (() => null) as unknown as T);
  const value = computed<T | null>(() => toValue(injectedV));

  return [value] as const;
};
