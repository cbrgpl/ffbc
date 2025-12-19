import type { TooltipOwnerProps, TooltipOwnerSlots } from "~/ui/q-tooltip";

export type BorderWidth = '1' | "2" | '3' | '5' | '8'

export type ShapeLoaderProps = {
  /** loader border width */
  borderWidth?: BorderWidth;
} & TooltipOwnerProps

export type ShapeLoaderOwnerProps = {
  /** loader border width */
  loaderBorderWidth?: BorderWidth;
} & TooltipOwnerProps

export type ShapeLoaderSlots = Pick<TooltipOwnerSlots, 'tooltip-content'>