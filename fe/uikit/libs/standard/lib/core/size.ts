import { computed } from "vue";

export type Sizes = "xs" | "sm" | "md" | "lg" | "xl";

export type SizeProps<S extends Sizes = Sizes> = {
  /** Size of component */
  size?: S;
};

export const useSize = ($props: SizeProps) => {
  const sizeClasses = computed(() => {
    return [$props.size];
  });

  return { sizeClasses };
};
