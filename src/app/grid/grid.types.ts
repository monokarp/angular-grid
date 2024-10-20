interface PaginationConfig {
  pageSize: number;
}

interface BaseColumnDefinition<T> {
  prop: keyof T;
  label: string;
}

function isColDef<T>(val: any): val is BaseColumnDefinition<T> {
  return (
    Object.hasOwn(val, 'prop') &&
    typeof val.prop == 'string' &&
    Object.hasOwn(val, 'label') &&
    typeof val.label == 'string'
  );
}

interface IdCol {
  prop: 'id';
  label: string;
}

export function isIdCol(value: any): value is IdCol {
  return value.prop == 'id' && typeof value.label == 'string';
}

interface StrCol<T> extends BaseColumnDefinition<T> {
  type: 'string';
}

export function isStringCol<T>(value: any): value is DateCol<T> {
  return value.type == 'string' && isColDef(value);
}

interface DateCol<T> extends BaseColumnDefinition<T> {
  type: 'date';
  format?: Intl.DateTimeFormatOptions;
}

export function isDateCol<T>(value: any): value is DateCol<T> {
  return value.type == 'date' && isColDef(value);
}

export type ColumnDefinition<T> = IdCol | StrCol<T> | DateCol<T>;

export interface RowType {
  id: string;
}

export interface GridConfiguration<T extends RowType> {
  pagination: PaginationConfig;
  search: {
    inputDelayMs: number;
    prop: keyof T;
  };
  columnDefinitions: ColumnDefinition<T>[];
  dataProvider: {
    getData: (
      searchValue: string,
      top: number,
      skip: number
    ) => Promise<{ rows: T[]; totalRowCount: number }>;
  };
}
