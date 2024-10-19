import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RowType } from '../../../grid.types';

@Component({
  selector: 'app-data-cell',
  standalone: true,
  imports: [],
  templateUrl: './data-cell.component.html',
  styleUrl: './data-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCellComponent<T> {
  @Input() public data!: T;
}
