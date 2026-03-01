import { useUiContext } from "./use-ui-context";

export type UnavailableProps = {
  /** Disabled state */
  disabled?: boolean;
  /** Readonly. It's like disabled behavior but with different stylization */
  readonly?: boolean;
};

export const useUnavailable = () => {
  const { context } = useUiContext();

  /** If component disabled or readonly it is unavailable to interact */
  const isUnavailable = computed<boolean>(() => {
    return Boolean(context.value.disabled || context.value.readonly);
  });

  return {
    isUnavailable,
  };
};
