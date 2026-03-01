import type { Sizes } from "~uikit/libs/standard";
import { useInjection } from "~uikit/libs/use-injection";
import { SIZE_INJ_KEY } from "~uikit/ui/q-button-group";
import type { ButtonForm } from "~uikit/ui/q-button-base";
import type { ButtonVariants } from "./use-button-base-mapping";
import { type MaybeRefOrGetter, computed, toValue } from "vue";

/** Calculates size with next priority:
 * injected size -> prop size
 */
export const useSize = (size: MaybeRefOrGetter<Sizes>, form: MaybeRefOrGetter<ButtonForm>, variant: MaybeRefOrGetter<ButtonVariants>) => {
  const [paramsInj] = useInjection(SIZE_INJ_KEY);

  const compSize = computed(() => toValue(paramsInj)?.size ?? toValue(size));
  const compForm = computed(() => toValue(paramsInj)?.form ?? toValue(form));
  const compVariant = computed(() => toValue(paramsInj)?.variant ?? toValue(variant));

  return { compSize, compForm, compVariant };
};
