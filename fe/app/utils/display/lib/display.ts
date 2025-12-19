import { useWindowSize } from "@vueuse/core"

/** Used as X < Breakpoint:
 *  Mobiles are X < 600
 *  Tablets are X < 1200
 *  Small Displays are X < 1600
 *  Medium Displays are X < 1920
 *  Else default display
 */
export enum BreakpointValues {
  /** Mobile */
  M = 600,
  /** Tablet */
  T = 1200,
  /** Small display */
  SD = 1600,
  /** Medium display */
  MD = 1920
}

export type Breakpoints = keyof typeof BreakpointValues | 'DD'

export const useDisplay = () => {
  return {
    ...useBreakpoint()
  }
}

function useBreakpoint() {
  const { width } = useWindowSize()

  /** Active breakpoint */
  const breakpoint = computed<Breakpoints>(() => {
    if(width.value < BreakpointValues.M) {
      return 'M'
    } else if(width.value < BreakpointValues.T) {
      return 'T'
    } else if(width.value < BreakpointValues.SD) {
      return 'SD'
    } else if(width.value < BreakpointValues.MD) {
      return 'MD'
    } else {
      return 'DD'
    }
  })

  return {
    breakpoint,
    displayWidth: width
  }
}