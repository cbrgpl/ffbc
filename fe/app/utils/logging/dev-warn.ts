export const devWarn = (...data: unknown[]) => {
  if (import.meta.env.DEV) {
    console.warn(...data);
  }
};
