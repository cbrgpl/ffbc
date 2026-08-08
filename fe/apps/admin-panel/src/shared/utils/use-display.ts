import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

export const useDisplay = () => {
  const isDesktop = useBreakpoints(breakpointsTailwind).greaterOrEqual("lg");

  return {
    isDesktop,
  };
};
