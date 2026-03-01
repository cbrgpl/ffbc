import type { InjectionKey } from "vue";
import type { ButtonVariants } from "~/ui/q-button";
import type { ButtonForm } from "~/ui/q-button-base";
import type { Sizes } from "~/utils/ui-toolkit";

export const SIZE_INJ_KEY = Symbol("SIZE_INJ_KEY") as InjectionKey<{
  size: Sizes;
  variant: Extract<ButtonVariants, "default" | "tonal" | "outline">;
  form: ButtonForm;
}>;
