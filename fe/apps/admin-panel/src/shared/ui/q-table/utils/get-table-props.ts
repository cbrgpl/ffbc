import { type Ref, computed } from "vue";

export const getTableProps = (loading: Ref<boolean>) => ({
  emptyTitle: computed(() => {
    return loading.value ? "Data is loading" : "There is no input characteristics yet";
  }),
  ui: {
    separator: "z-0",
    thead: "after:z-0",
  },
});
