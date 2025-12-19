import { useTooltipProps } from "~/ui/q-tooltip";
import type { ShapeLoaderProps, ShapeLoaderOwnerProps} from "../types";

export const useShapeLoaderProps = ( $props: ShapeLoaderOwnerProps ) => {
  const { tooltipOwnerProps } = useTooltipProps($props)

  const shapeLoaderProps = computed<ShapeLoaderProps>(() => {
    const props: ShapeLoaderProps = {}

    if($props.loaderBorderWidth) {
      props.borderWidth = $props.loaderBorderWidth
    }

    return { ...props, ...tooltipOwnerProps }
  })

  const shapeLoaderOwnerProps = computed<ShapeLoaderOwnerProps>(() => {
    const props: ShapeLoaderOwnerProps = {}

    if($props.loaderBorderWidth) {
      props.loaderBorderWidth = $props.loaderBorderWidth
    }

    return {...props, ...tooltipOwnerProps}
  })

  return { shapeLoaderProps, shapeLoaderOwnerProps }
}