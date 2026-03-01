import type { Sizes } from "~/utils/ui-toolkit";
import { useInjection } from "~/utils/use-injection";
import { SIZE_INJ_KEY } from "~/ui/q-button-group";
import type { ButtonForm } from "~/ui/q-button-base";
import type { ButtonVariants } from "./use-button-base-mapping";

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
