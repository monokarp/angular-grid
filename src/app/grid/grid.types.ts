interface Pagination {
  pageSize: number;
}

// TODO add virtual scroll config

type PaginationConfig = Pagination;

interface SearchConfig {
  inputDelayMs: number;
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

type ColumnDefinition<T> = IdCol | StrCol<T> | DateCol<T>;

interface RowDataProvider<T> {
  getPage: (pageNumber: number) => Promise<T[]>;
  countRows: () => Promise<number>;
}

type StaticRowData<T> = T[];

type RowData<T> = StaticRowData<T>; // | RowDataProvider<T>;

export interface RowType {
  id: string;
}

export interface GridConfiguration<T extends RowType> {
  pagination: PaginationConfig;
  search: SearchConfig;
  columnDefinitions: ColumnDefinition<T>[];
  rowData: RowData<T>;
}
