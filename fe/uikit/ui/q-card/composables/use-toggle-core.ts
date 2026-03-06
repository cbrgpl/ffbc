import { computed, type MaybeRefOrGetter, toValue } from "vue";

import type { CardBaseState } from "../types";

export type ToggleCoreProps = {
  /** Enables keyboard-accessible interactions */
  accessible?: boolean;
  /** Freezes visual state and disables interactive toggling */
  static?: boolean;
};

type UseToggleCoreOptions = {
  accessible: MaybeRefOrGetter<boolean | undefined>;
  static: MaybeRefOrGetter<boolean | undefined>;
  state: MaybeRefOrGetter<CardBaseState | undefined>;
  unavailable?: MaybeRefOrGetter<boolean | undefined>;
};

const DEFAULT_STATE: CardBaseState = "enabled";

export const useToggleCore = (options: UseToggleCoreOptions) => {
  const isUnavailable = computed(() => Boolean(toValue(options.unavailable)));

  const isStatic = computed(() => {
    return Boolean(toValue(options.static));
  });

  const isInteractive = computed(() => {
    return Boolean(toValue(options.accessible)) && !isStatic.value && !isUnavailable.value;
  });

  const forcedState = computed<CardBaseState>(() => {
    if (isUnavailable.value) {
      return DEFAULT_STATE;
    }

    if (isStatic.value) {
      return toValue(options.state) ?? DEFAULT_STATE;
    }

    return DEFAULT_STATE;
  });

  return {
    isInteractive,
    forcedState,
    isStatic,
  };
};
