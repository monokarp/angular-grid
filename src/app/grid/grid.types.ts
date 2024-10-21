interface PaginationConfig {
  pageSize: number;
}

interface DataCol<T> {
  prop: keyof T;
  label: string;
}

export function isDataCol<T>(val: any): val is DataCol<T> {
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

interface StrCol<T> extends DataCol<T> {
  type: 'string';
}

export function isStringCol<T>(value: any): value is DateCol<T> {
  return value.type == 'string' && isDataCol(value);
}

interface DateCol<T> extends DataCol<T> {
  type: 'date';
  format?: Intl.DateTimeFormatOptions;
}

export function isDateCol<T>(value: any): value is DateCol<T> {
  return value.type == 'date' && isDataCol(value);
}

export interface ActionCol<T> {
  action: string;
  label: string;
  handler: (row: T) => Promise<void>;
  refreshData?: boolean;
}

export function isActionCol<T>(value: any): value is ActionCol<T> {
  return typeof value.action == 'string' && typeof value.handler == 'function';
}

export interface GridAction<T> {
  def: ActionCol<T>;
  row: T;
}

export type ColumnDefinition<T> = IdCol | ActionCol<T> | StrCol<T> | DateCol<T>;

export interface RowType {
  id: string;
}

export interface RowData<T> {
  rows: T[];
  totalRowCount: number;
}

export interface GridConfiguration<T extends RowType> {
  pagination: PaginationConfig;
  search: {
    inputDelayMs: number;
  };
  columnDefinitions: ColumnDefinition<T>[];
  dataProvider: {
    getData: (
      searchValue: string,
      top: number,
      skip: number
    ) => Promise<RowData<T>>;
  };
}
