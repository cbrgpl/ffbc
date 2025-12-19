import { useWindowSize } from "@vueuse/core"

export enum BreakpointValues {
  /** Mobile */
  M = 560,
  /** Tablet */
  T = 1024,
  /** Small display */
  SD = 1600,
  /** Default display */
  DD = 1920
}

export type Breakpoints = 'M' | 'T' | 'SD' | 'DD'

export const useDisplay = () => {
  return {
    ...useBreakpoint()
  }
}

function useBreakpoint() {
  const { width } = useWindowSize()

  const currentBreakpoint = computed<Breakpoints>(() => {
    if(width.value <= BreakpointValues.M) {
      return 'M'
    } else if(width.value <= BreakpointValues.T) {
      return 'T'
    } else if(width.value <= BreakpointValues.SD) {
      return 'SD'
    } else {
      return 'DD'
    }
  })

  return {
    currentBreakpoint
  }
}