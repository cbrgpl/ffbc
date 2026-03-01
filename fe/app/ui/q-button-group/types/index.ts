import type { Icons } from "~/ui/q-icon";

export type ConnectedButtonGroupSeg = {
  /** Button selection value */
  value: unknown;
  /** Optional key used as v-for's key */
  key?: string;
  /** Button text */
  text?: string;
  /** Icon */
  icon?: Icons;
  /** Icon when button is selected. Ignored if no icon */
  selectedIcon?: Icons;
  /** Button disabled state. Extends connected button group disable. */
  disabled?: MaybeRefOrGetter<boolean>;
};
