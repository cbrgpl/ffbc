export type CardBaseVariants = "outlined" | "elevated" | "filled";

export type CardBaseState = "enabled" | "hovered" | "focused" | "pressed" | "dragged";

export type CardBaseProps = {
  /** Visual style of card container */
  variant?: CardBaseVariants;
  /** Explicitly forces card state. Works only with static=true */
  state?: CardBaseState;
  /** Renders focus indicator */
  focusIndicator?: boolean;
};
