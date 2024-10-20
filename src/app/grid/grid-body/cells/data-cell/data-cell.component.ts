import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  ColumnDefinition,
  isDateCol,
  isIdCol,
  isStringCol,
  RowType,
} from '../../../grid.types';
import { DateCellComponent } from './date-cell/date-cell.component';
import { StrCellComponent } from './str-cell/str-cell.component';

@Component({
  selector: 'app-data-cell',
  standalone: true,
  imports: [],
  template: '<ng-container #outlet></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCellComponent<T extends RowType> implements OnInit {
  @Input() public definition!: ColumnDefinition<T>;
  @Input() public value!: T[keyof T];

  @ViewChild('outlet', { read: ViewContainerRef, static: true })
  public container!: ViewContainerRef;

  public ngOnInit(): void {
    if (isStringCol(this.definition) || isIdCol(this.definition)) {
      const cellRef = this.container.createComponent(StrCellComponent);

      cellRef.instance.value = this.value as string;

      return;
    }

    if (isDateCol(this.definition)) {
      const cellRef = this.container.createComponent(DateCellComponent);

      cellRef.instance.value = this.value as string;
      cellRef.instance.format = this.definition.format;

      return;
    }

    throw new Error('Unsupported cell format', { cause: this.definition });
  }
}
