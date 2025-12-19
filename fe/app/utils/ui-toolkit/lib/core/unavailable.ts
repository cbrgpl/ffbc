import type { UI_PROP_DEFAULT_V } from '../static';
import { useUiContext } from './ui-context-provider';
 
export type UnavailableProps = {
  /** Disabled state */
  disabled?: boolean | typeof UI_PROP_DEFAULT_V;
  /** Readonly. It's like disabled behavior but with different stylization */
  readonly?: boolean | typeof UI_PROP_DEFAULT_V;
}

export const useUnavailable = ( $props: UnavailableProps ) => {
  const { udisabled, ureadonly } = useUiContext($props)

  /** If component disabled or readonly it is unavailable to interact */
  const isUnavailable = computed<boolean>(() => {
    return Boolean(udisabled?.value || ureadonly?.value)
  })

  return {
    isUnavailable
  }
}