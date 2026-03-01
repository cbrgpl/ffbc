/** Adds neccesary styles to layout child element to make it fill parent */
export const vFillLayout = (el: HTMLElement) => {
  if (import.meta.client) {
    el.style.flexGrow = "1";
  }
};
