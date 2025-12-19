import { type InjectionKey, computed, toValue } from "vue";
import { merge } from 'ts-deepmerge'

import { UI_PROP_DEFAULT_V } from "../static";

import type { LoadingProps } from './loading'
import type { UnavailableProps } from "./unavailable";
import type { ColorProps, Colors, Themes } from "./color";

import type { _Refify } from "../types";

const DEFAULT_COLOR: Colors = "primary"
const DEFAULT_THEME: Themes = 'light'

/**
 * This module is inspired by Vuetify color system, which uses DI to override color for component and all its children.
 * 
 * Weird realization with many "as" but it is correctly typed and "as" are used only in-module.
 * 
 * @example Example code snippet
 * 
 * ```ts
 * const $props = defineProps<UiProps & {...}>()
 * 
 * // only color is present it returning type cause generic-return
 * const { color } = useUiContext($props)
 * ```
 * 
 */

export type UiProps = Partial<ColorProps & UnavailableProps & LoadingProps>

/** Format props to ui context naming
 * 
 * loading -> uloading
 */
type _FormatProps<T extends object> = {
  [Key in Extract<keyof T, string> as `u${Key}`]-?: T[Key]
}

type UiContext = _FormatProps<{
  [Key in keyof UiProps]-?: MaybeRefOrGetter<Exclude<UiProps[Key], typeof UI_PROP_DEFAULT_V>> 
}>

const UI_CONTEXT_INJECTION_KEY = Symbol('UI_CONTEXT_INJECTION_KEY') as InjectionKey<Partial<UiContext>>

export const provideAppContext = <Context extends Partial<UiContext>>(context: Context) => {
  provide(UI_CONTEXT_INJECTION_KEY, context)
}

/** Prevent provide of some context params deeper */
type ProvideOpts = {
  color?: boolean;
  theme?: boolean;
  disabled?: boolean;
  loading?: boolean;
  readonly?: boolean;
}

type Params = {
  provide: ProvideOpts
  __debugging: boolean
}

export const useUiContext = <Context extends UiProps>( internalContext?: Context, params?: Partial<Params> ): _Refify<_FormatProps<Context>, typeof UI_PROP_DEFAULT_V> => {
  const { provide } = mergeParams(params)

  const injectedContext: Partial<UiContext> = inject(UI_CONTEXT_INJECTION_KEY, {})

  const normalizedInjectedContext = computed<Partial<UiContext>>(() => ({
    ucolor: injectedContext.ucolor ? toValue(injectedContext.ucolor) : undefined,
    utheme: injectedContext.utheme ? toValue(injectedContext.utheme) : undefined,
    udisabled: injectedContext.udisabled ? toValue(injectedContext.udisabled) : undefined,
    uloading: injectedContext.uloading ? toValue(injectedContext.uloading) : undefined,
    ureadonly: injectedContext.ureadonly ? toValue(injectedContext.ureadonly) : undefined
  }))
  
  const context: Partial<UiContext> = {}

  if(provide?.color) {
    context.ucolor = computed(() => {
      if(internalContext?.color && internalContext.color !== UI_PROP_DEFAULT_V) {
        return toValue(internalContext.color)
      } 

      return toValue(normalizedInjectedContext.value.ucolor) ?? DEFAULT_COLOR
    })
  }

  if(provide?.theme) {
    context.utheme = computed(() => {
      if(internalContext?.theme && internalContext.theme !== UI_PROP_DEFAULT_V) {
        return toValue(internalContext.theme)
      }

      return toValue(normalizedInjectedContext.value.utheme) ?? DEFAULT_THEME
    } )
  }

  if(provide?.disabled) {
    context.udisabled = computed(() => {
      if(internalContext?.disabled !== undefined) {
        return toValue(internalContext.disabled)
      }

      return toValue(normalizedInjectedContext.value.udisabled) ?? false
    })
  }

  if(provide?.loading) {
    context.uloading = computed(() => {
      if(internalContext?.loading !== undefined) {
        return internalContext.loading
      }

      return toValue(normalizedInjectedContext.value.uloading) ?? false
    })
  }

  if(provide?.readonly) {
    context.ureadonly = computed(() => {
      if(internalContext?.readonly !== undefined) {
        return toValue(internalContext.readonly)
      }

      return toValue(normalizedInjectedContext.value.ureadonly) ?? false
    })
  }

  provideAppContext(context) 

  return context as _Refify<_FormatProps<Context>, typeof UI_PROP_DEFAULT_V>
}

function mergeParams( outerParams: Partial<Params> = {} ): Params {
  const defaultParams: Params = {
    provide: {
      color: true,
      theme: true,
      loading: true,
      disabled: true,
      readonly: true
    },
    __debugging: false
  }

  return merge(defaultParams, outerParams) as Params
}