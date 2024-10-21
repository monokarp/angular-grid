import { ColumnDefinition } from './grid.types';

export class ColumnDefinitionError<T> extends Error {
  def: ColumnDefinition<T>;

  constructor(message: string, def: ColumnDefinition<T>) {
    super(message);
    this.def = def;
  }
}
