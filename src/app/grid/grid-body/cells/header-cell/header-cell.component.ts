import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColumnDefinition } from '../../../grid.types';

@Component({
  selector: 'app-header-cell',
  standalone: true,
  imports: [],
  templateUrl: './header-cell.component.html',
  styleUrl: './header-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderCellComponent<T> {
  @Input() public data!: ColumnDefinition<T>;
}
