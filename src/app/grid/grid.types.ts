interface PaginationConfig {
  pageSize: number;
}

interface BaseColumnDefinition<T> {
  prop: keyof T;
  label: string;
}

interface IdCol {
  prop: 'id';
  label: string;
}

interface StrCol<T> extends BaseColumnDefinition<T> {
  type: 'string';
}

interface DateCol<T> extends BaseColumnDefinition<T> {
  type: 'date';
}

export type ColumnDefinition<T> = IdCol | StrCol<T> | DateCol<T>;

export interface RowType {
  id: string;
}

export interface GridConfiguration<T extends RowType> {
  pagination: PaginationConfig;
  columnDefinitions: ColumnDefinition<T>[];
}
