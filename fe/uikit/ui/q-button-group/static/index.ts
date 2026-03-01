import type { InjectionKey } from "vue";
import type { ButtonVariants } from "~uikit/ui/q-button";
import type { ButtonForm } from "~uikit/ui/q-button-base";
import type { Sizes } from "~uikit/libs/standard";

export const SIZE_INJ_KEY = Symbol("SIZE_INJ_KEY") as InjectionKey<{
  size: Sizes;
  variant: Extract<ButtonVariants, "default" | "tonal" | "outline">;
  form: ButtonForm;
}>;
