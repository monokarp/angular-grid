import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  ActionCol,
  ColumnDefinition,
  GridAction,
  isActionCol,
  isDataCol,
  RowType,
} from '../grid.types';
import { GridCellComponent } from './cells/data-cell/grid-cell.component';
import { HeaderCellComponent } from './cells/header-cell/header-cell.component';
import { ColumnDefinitionError } from '../grid.errors';

@Component({
  selector: 'app-grid-body',
  standalone: true,
  imports: [HeaderCellComponent, GridCellComponent],
  templateUrl: './grid-body.component.html',
  styleUrl: './grid-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBodyComponent<T extends RowType> {
  @Input() public columnDefinitions!: ColumnDefinition<T>[];
  @Input() public rowData!: T[];

  public trackCol(def: ColumnDefinition<T>) {
    if (isActionCol(def)) {
      return def.action;
    }

    if (isDataCol(def)) {
      return def.prop;
    }

    throw new ColumnDefinitionError('Unknown column type', def);
  }

  public gridTemplateColsCss() {
    return `repeat(${this.columnDefinitions.length}, minmax(0, max-content))`;
  }
}
