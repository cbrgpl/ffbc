import { computed } from 'vue'

export type Sizes = 'xs' | 'sm' | 'md' | 'lg'
const sizesOrder: Sizes[] = ['xs', 'sm', 'md', 'lg'] 

const DEFAULT_SIZE_ORDER = 2

export type SizeProps = {
  /** Size of component */
  size?: Sizes;
}

export const useSize = ( $props: SizeProps, params: { minSize?: Sizes } = {} ) => {
  const { minSize = 'xs' } = params
  const sizeClasses = computed(() => {
    const sizeOrder = $props.size ? sizesOrder.indexOf($props.size) : DEFAULT_SIZE_ORDER
    const minSizeOrder = sizesOrder.indexOf(minSize)

    return [sizeOrder <= minSizeOrder ? minSize : $props.size]
  })
  return { sizeClasses }
}
