import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GridConfiguration, RowType } from './grid.types';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import { GridBodyComponent } from './grid-body/grid-body.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridPaginationComponent, GridBodyComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;
  @Input() data!: T[];
  @Input() totalRows!: number;

  @Output() public pageSelected = new EventEmitter<number>();
}
