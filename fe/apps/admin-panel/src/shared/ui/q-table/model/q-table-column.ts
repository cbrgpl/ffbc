import type { TableColumn, TableData } from "@nuxt/ui";
import type { FunctionalComponent } from "vue";

export type QTableSkeletonContext<T extends TableData> = {
  column: TableColumn<T>;
  columnIndex: number;
  rowIndex: number;
};

export type QTableSkeleton<T extends TableData> = FunctionalComponent<QTableSkeletonContext<T>>;

export type QTableColumn<T extends TableData, D = unknown> = TableColumn<T, D> & {
  /** Custom skeleton cell renderer used while initial data is loading. */
  skeleton?: QTableSkeleton<T>;
};
