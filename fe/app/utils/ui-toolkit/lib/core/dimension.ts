import { convertToUnit } from "../utils/convert-to-unit";

export type DimensionProps = {
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  /** Adds width: 100% */
  fullWidth?: boolean;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
};

export const useDimension = ($props: DimensionProps) => {
  const dimensionStyle = computed(() => {
    const fullWidth = $props.fullWidth ? "100%" : null;

    return {
      width: fullWidth ?? convertToUnit($props["width"]),
      "min-width": convertToUnit($props.minWidth),
      "max-width": convertToUnit($props.maxWidth),
      height: convertToUnit($props["height"]),
      "min-height": convertToUnit($props.minHeight),
      "max-height": convertToUnit($props.maxHeight),
    };
  });

  return { dimensionStyle };
};
