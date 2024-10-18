import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GridConfiguration, RowType } from './grid.types';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridSearchComponent, GridPaginationComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;

  public onSearch(val: string) {
    console.log('search changed', val);
  }

  public onPageSelected(val: number) {
    console.log('page selected', val);
  }
}
