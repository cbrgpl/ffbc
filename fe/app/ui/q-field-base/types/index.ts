import type { FeedbackStatusProps } from "~/utils/ui-toolkit";

/** Shared props for exact field implementations */
export type FieldBaseProps = {
   /** Field label */
  label?: string;
  /** Tip for field. It is always displayed on next line before error message. */
  tip?: string;
  /** Error message */
  errorMessage?: string;
} & FeedbackStatusProps<'error' | "success" | "warn">

export type FieldBaseSlots = {
  label?: ( props: Record<string, never> ) => unknown;
}