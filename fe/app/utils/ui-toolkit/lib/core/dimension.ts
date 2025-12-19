import { convertToUnit } from "../utils/convert-to-unit";

export type DimensionProps = {
  width?: string;
  'min-width'?: string;
  'max-width'?: string;
  height?: string;
  'min-height'?: string;
  'max-height'?: string;
}

export const useDimension = ( $props: DimensionProps ) => {
  const dimensionStyles = computed(() => ({
    'width': convertToUnit($props['width']),
    'min-width': convertToUnit($props['min-width']),
    'max-width': convertToUnit($props['max-width']),
    'height': convertToUnit($props['height']),
    'min-height': convertToUnit($props['min-height']),
    'max-height': convertToUnit($props['max-height']),
  }))

  return { dimensionStyles }
}