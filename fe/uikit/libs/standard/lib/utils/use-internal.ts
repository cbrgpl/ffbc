/** Used when withDefaults cannot be used for props, gives type-safe way to create prop with default */
export const useInternal = <T>(v: MaybeRefOrGetter<T>, defaultV: T & {}): ComputedRef<T> => computed(() => toValue(v) ?? defaultV);
