import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnDefinition, RowData, RowType } from '../grid.types';
import { HeaderCellComponent } from './cells/header-cell/header-cell.component';
import { DataCellComponent } from './cells/data-cell/data-cell.component';

@Component({
  selector: 'app-grid-body',
  standalone: true,
  imports: [HeaderCellComponent, DataCellComponent],
  templateUrl: './grid-body.component.html',
  styleUrl: './grid-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBodyComponent<T extends RowType> {
  @Input() public columnDefinitions!: ColumnDefinition<T>[];
  @Input() public rowData!: RowData<T>;
}
