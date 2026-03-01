import { type InjectionKey, computed, inject, provide, getCurrentInstance, type ComponentInternalInstance } from "vue";

import type { LoadingProps } from "./loading";
import type { UnavailableProps } from "./unavailable";

import type { ColorProps, Themes } from "./color";
import type { _ModifyValueType } from "../types";

/**
 * @example Snippet code
 *
 * ```ts
 * const $props = defineProps<LoadingProps & UnavailableProps & ColorProps & {...}>()
 *
 * const { context } = useUiContext()
 * ```
 *
 * ```html
 * <div :class="{'el_loading': context.loading}" ></div>
 * ```
 *
 */

/** Params which make up UiContext */
type UiContext = UnavailableProps & LoadingProps & Pick<ColorProps, "theme">;

/** Params could be undefined */
type UndefinableUiContext = Ref<_ModifyValueType<UiContext, "raw", true>>;

const UI_CONTEXT_INJECTION_KEY = Symbol("UI_CONTEXT_INJECTION_KEY") as InjectionKey<UndefinableUiContext>;

const provideUiContext = (context: UndefinableUiContext) => {
  provide(UI_CONTEXT_INJECTION_KEY, context);
};

type UseUiContextOptions = {
  __debugging?: boolean;
};

/**
 * Calculates result value for each context param
 *
 * Priority is:
 *
 * `default value` -> `injected value` -> `passed prop` *highest priority*
 */
export const useUiContext = (passedContext?: Partial<_ModifyValueType<UiContext, "refOrGetter", false>>, options?: UseUiContextOptions) => {
  const { __debugging = false } = options ?? {};

  const injectedContext = inject(UI_CONTEXT_INJECTION_KEY, undefined);

  const instance = getCurrentInstance();

  if (__debugging) {
    console.debug(instance);
  }

  if (!instance) {
    throw new Error("useUiContext could be used only in setup");
  }

  const defaultProps = instance.type.props as Record<string, { default: unknown }> | undefined;

  const context = computed<_ModifyValueType<UiContext, "raw", false>>(() => {
    const props = instance.proxy?.$props as Record<string, unknown> | undefined;

    return {
      disabled: calcUiProp<boolean>(
        toValue(passedContext?.disabled) ?? returnIfNotDefault(instance, "disabled", props?.disabled),
        injectedContext?.value.disabled,
        !!defaultProps?.disabled?.default,
      ),
      loading: calcUiProp<boolean>(
        toValue(passedContext?.loading) ?? returnIfNotDefault(instance, "loading", props?.loading),
        injectedContext?.value.loading,
        !!defaultProps?.loading?.default,
      ),
      readonly: calcUiProp<boolean>(
        toValue(passedContext?.readonly) ?? returnIfNotDefault(instance, "readonly", props?.readonly),
        injectedContext?.value.readonly,
        !!defaultProps?.readonly?.default,
      ),
      theme: calcUiProp<Themes>(
        toValue(passedContext?.theme) ?? returnIfNotDefault(instance, "theme", props?.theme),
        injectedContext?.value.theme,
        defaultProps?.theme?.default,
      ),
    };
  });

  provideUiContext(context);

  return { context };
};

function calcUiProp<T>(userV: unknown, injectedV: unknown, defaultV: unknown): T {
  if (userV !== undefined) {
    return userV as T;
  } else if (injectedV !== undefined) {
    return injectedV as T;
  } else {
    return defaultV as T;
  }
}

/** Returns passed prop value if it is not default value */
function returnIfNotDefault(instance: ComponentInternalInstance, prop: string, value: unknown) {
  if ((instance.vnode.props?.[prop] || instance.vnode.props?.[prop] === "") && instance.proxy) {
    return value;
  }
}
