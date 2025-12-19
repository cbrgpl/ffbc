import type { TooltipOwnerProps, TooltipProps } from "../types";

export const useTooltipProps = ( $props: TooltipOwnerProps ) => {
  const tooltipProps = computed<TooltipProps>(() => {
    const props: Record<string, unknown> = {}

    if($props.tooltipContent) {
      props.content = $props.tooltipContent
    }

    if($props.tooltipDefer) {
      props.defer = $props.tooltipDefer
    }

    if($props.tooltipLayout) {
      props.layout = $props.tooltipLayout
    }

    if($props.tooltipPersist) {
      props.persist = $props.tooltipPersist
    }

    return props
  })

  const tooltipOwnerProps = computed<TooltipOwnerProps>(() => {
    const props: Record<string, unknown> = {}

    if($props.tooltipContent) {
      props.tooltipContent = $props.tooltipContent
    }

    if($props.tooltipDefer) {
      props.tooltipDefer = $props.tooltipDefer
    }

    if($props.tooltipLayout) {
      props.tooltipLayout = $props.tooltipLayout
    }

    if($props.tooltipPersist) {
      props.tooltipPersist = $props.tooltipPersist
    }

    return props
  })

  return { tooltipProps, tooltipOwnerProps }
}