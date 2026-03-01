import { getIndex } from "./z-index";

export const useZIndex = () => {
  const zIndex = ref<string>(getIndex());
  const zIndexStyle = computed(() => ({ "z-index": zIndex.value.toString() }));
  const updateIndex = () => (zIndex.value = getIndex());

  return [zIndex, zIndexStyle, updateIndex] as const;
};
