import type { ButtonForm, ButtonBaseVariants } from "../types";
import { computed, toValue, type MaybeRefOrGetter, type ModelRef } from "vue";

type RadiusesMap = Record<ButtonForm, string>;

export type ToggleCoreProps = {
  /** Makes button togglable */
  toggle?: boolean;
};

const toggledVariantMap: Partial<Record<ButtonBaseVariants, ButtonBaseVariants>> = {
  "surface-container": "primary",
  "secondary-container": "secondary",
  "outline-variant": "inverse-surface",
  "surface-container-low": "primary",
  "surface-variant-text": "primary-text",
};

export const useToggleCore = (
  radiusesMap: RadiusesMap,
  form: MaybeRefOrGetter<ButtonForm>,
  variant: MaybeRefOrGetter<ButtonBaseVariants>,
  selected: ModelRef<boolean | undefined>,
) => {
  const borderRadiusClasses = computed(() => {
    if (toValue(form) === "round" && !toValue(selected)) {
      return [radiusesMap.round];
    } else if (toValue(form) === "round" && toValue(selected)) {
      return [radiusesMap.square];
    } else if (toValue(form) === "square" && !toValue(selected)) {
      return [radiusesMap.square];
    } else if (toValue(form) === "square" && toValue(selected)) {
      return [radiusesMap.round];
    } else {
      return [];
    }
  });

  const buttonBaseVariant = computed(() => {
    if (selected.value) {
      return toggledVariantMap[toValue(variant)] ?? toValue(variant);
    }

    return toValue(variant);
  });

  return {
    borderRadiusClasses,
    buttonBaseVariant,
  };
};
