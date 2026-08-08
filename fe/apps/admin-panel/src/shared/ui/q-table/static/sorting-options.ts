import type { RowData, SortingOptions } from "@tanstack/vue-table";

export const SORTING_OPTIONS = {
  manualSorting: true,
} satisfies Pick<SortingOptions<RowData>, "manualSorting">;
