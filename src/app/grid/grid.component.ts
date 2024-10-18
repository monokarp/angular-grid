import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GridConfiguration, RowType } from './grid.types';
import { GridSearchComponent } from './grid-search/grid-search.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridSearchComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;

  public onSearch(val: string) {
    console.log('search changed', val);
  }
}
