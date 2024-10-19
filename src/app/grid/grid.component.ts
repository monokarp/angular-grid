import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GridConfiguration, RowData, RowType } from './grid.types';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import { GridBodyComponent } from './grid-body/grid-body.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridSearchComponent, GridPaginationComponent, GridBodyComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;

  private currentPage = 0;

  public onSearch(val: string) {
    console.log('search changed', val);
  }

  public onPageSelected(val: number) {
    console.log('page selected', val);
    this.currentPage = val;
  }

  public getCurrentPageRows(): RowData<T> {
    const { pageSize } = this.configuration.pagination;

    const res = this.configuration.rowData.slice(
      this.currentPage * pageSize,
      (this.currentPage + 1) * pageSize
    );

    return res;
  }
}
