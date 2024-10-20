import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { GridConfiguration, RowType } from './grid.types';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import { GridBodyComponent } from './grid-body/grid-body.component';
import {
  Subject,
  BehaviorSubject,
  merge,
  startWith,
  switchMap,
  withLatestFrom,
  mergeAll,
  share,
  map,
} from 'rxjs';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    GridPaginationComponent,
    GridBodyComponent,
    GridSearchComponent,
    CommonModule,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;

  @Output() public pageSelected = new EventEmitter<number>();

  public readonly page$ = new Subject<number>();
  public readonly search$ = new BehaviorSubject<string>('');

  private readonly paginatedData$ = merge([
    this.search$.pipe(
      startWith(''),
      switchMap((value) => {
        const { pageSize } = this.configuration.pagination;

        return this.configuration.dataProvider.getData(value, pageSize, 0);
      })
    ),
    this.page$.pipe(
      withLatestFrom(this.search$),
      switchMap(([page, search]) => {
        const { pageSize } = this.configuration.pagination;

        return this.configuration.dataProvider.getData(
          search,
          pageSize,
          pageSize * page
        );
      })
      // TODO if this doesnt throw, then I update the page
    ),
  ]).pipe(mergeAll(), share());

  public readonly rowData$ = this.paginatedData$.pipe(map((data) => data.rows));
  public readonly totalRows$ = this.paginatedData$.pipe(
    map((data) => data.totalRowCount)
  );
}
