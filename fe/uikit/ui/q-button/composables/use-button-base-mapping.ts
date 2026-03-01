import { computed, toValue, type MaybeRefOrGetter } from "vue";
import type { ButtonBaseVariants } from "~uikit/ui/q-button-base";
import { devWarn } from "~uikit/libs/logging";

export type ButtonVariants = "default" | "tonal" | "outline" | "elevated" | "standard" | "text";

export type ButtonProps<V extends ButtonVariants> = {
  /** Variant changes visual stylization of button */
  variant?: V;
};

export const useButtonBaseMapping = (
  iconOnlyMode: MaybeRefOrGetter<boolean>,
  variant: MaybeRefOrGetter<ButtonVariants>,
  toggle: MaybeRefOrGetter<boolean>,
) => {
  const mappedInitialVariant = computed<ButtonBaseVariants>(() => {
    if (!toValue(toggle) && toValue(variant) === "default") {
      return "primary";
    } else if (!toValue(toggle) && toValue(variant) === "tonal") {
      return "secondary-container";
    } else if (!toValue(toggle) && toValue(variant) === "outline") {
      return "outline-variant";
    } else if (!toValue(toggle) && toValue(variant) === "elevated") {
      return "surface-container-low";
    } else if (!toValue(toggle) && toValue(variant) === "text") {
      return "primary-text";
    } else if (toValue(iconOnlyMode) && toValue(variant) === "standard") {
      return "surface-variant-text";
    } else if (toValue(toggle) && toValue(variant) === "default") {
      return "surface-container";
    } else if (toValue(toggle) && toValue(variant) === "tonal") {
      return "secondary-container";
    } else if (toValue(toggle) && toValue(variant) === "outline") {
      return "outline-variant";
    } else if (toValue(toggle) && toValue(variant) === "elevated") {
      return "surface-container-low";
    } else {
      if (toValue(toggle) && toValue(variant) === "text") {
        devWarn(`[use-button-core]: "text" variant is not available for togglable button`);
      }

      if (!toValue(iconOnlyMode) && toValue(variant) === "standard") {
        devWarn(`[use-button-core]: "standard" variant is not available for not button icon`);
      }

      return "tertiary";
    }
  });

  return {
    mappedInitialVariant,
  };
};
