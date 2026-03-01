export type LoadingProps = {
  /** Loading state */
  loading?: boolean;
};

export type LoadingSlots = {
  /** Slot for rendering custom loader content */
  loader?: (props: { loading: boolean }) => unknown;
};
