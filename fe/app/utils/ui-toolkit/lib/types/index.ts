import type { Ref, MaybeRefOrGetter } from "vue";

type _ModifyValueTypeV<T, U extends boolean> = U extends true ? T | undefined : Exclude<T, undefined>;

/** Modifies T[Key] with correspondence value of W  */
export type _ModifyValueType<T extends object, W extends "ref" | "refOrGetter" | "raw", U extends boolean> = {
  [Key in keyof T]-?: W extends "ref"
    ? Ref<_ModifyValueTypeV<T[Key], U>>
    : W extends "refOrGetter"
      ? MaybeRefOrGetter<_ModifyValueTypeV<T[Key], U>>
      : _ModifyValueTypeV<T[Key], U>;
};
