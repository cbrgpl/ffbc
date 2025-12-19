import { computed } from 'vue';
import { useUiContext } from './ui-context-provider';

export type LoadingProps = {
  /** Loading state */
  loading?: boolean;
}

export type LoadingSlots = {
  /** Slot for rendering custom loader content */
  loader?: ( props: { loading: boolean } ) => unknown;
}

export const useLoading = ( $props: LoadingProps ) => {
  const { uloading } = useUiContext($props)

  const isLoading = computed<boolean>(() => {
    return Boolean(uloading?.value)
  })

  return { isLoading }
}
