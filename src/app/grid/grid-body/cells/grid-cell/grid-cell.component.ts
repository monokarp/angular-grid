import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ColumnDefinition,
  GridAction,
  isActionCol,
  isDateCol,
  isIdCol,
  isStringCol,
  RowType,
} from '../../../grid.types';
import { DateCellComponent } from './date-cell/date-cell.component';
import { StrCellComponent } from './str-cell/str-cell.component';
import { ActionCellComponent } from './action-cell/action-cell.component';
import { ColumnDefinitionError } from '../../../grid.errors';

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [],
  template: '<ng-container #outlet></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCellComponent<T extends RowType> implements OnInit {
  @Input() public definition!: ColumnDefinition<T>;
  @Input() public row!: T;

  @ViewChild('outlet', { read: ViewContainerRef, static: true })
  public container!: ViewContainerRef;

  public ngOnInit(): void {
    if (isStringCol(this.definition) || isIdCol(this.definition)) {
      const cellRef = this.container.createComponent(StrCellComponent);

      cellRef.instance.value = this.row[this.definition.prop] as string;

      return;
    }

    if (isDateCol(this.definition)) {
      const cellRef = this.container.createComponent(DateCellComponent);

      cellRef.instance.value = this.row[this.definition.prop] as string;
      cellRef.instance.format = this.definition.format;

      return;
    }

    if (isActionCol(this.definition)) {
      const cellRef = this.container.createComponent(ActionCellComponent);

      cellRef.instance.def = this.definition;
      cellRef.instance.row = this.row;

      return;
    }

    throw new ColumnDefinitionError('Unsupported cell format', this.definition);
  }
}
