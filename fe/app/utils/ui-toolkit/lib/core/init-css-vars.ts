import { watch, type Ref } from 'vue'

import { delayCssVars } from './delay'

const setCssVars = (el: HTMLElement, cssVars: Record<string, string>) => {
  for(const [variable, value] of Object.entries(cssVars)) {
    el.style.setProperty(variable, value)
  }
}

export const initCssVars = ( el: Ref<HTMLElement | null> ) => {
  const unwatch = watch(
    () => el.value,
    (el) => {
      if(el) {
        setCssVars(el, delayCssVars)

        setTimeout(() => { unwatch() })
      }
    },
    { immediate: true }
  )
}