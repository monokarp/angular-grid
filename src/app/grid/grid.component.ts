import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  BehaviorSubject,
  filter,
  map,
  merge,
  mergeAll,
  Observable,
  share,
  startWith,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { GridBodyComponent } from './grid-body/grid-body.component';
import { GridPaginationComponent } from './grid-pagination/grid-pagination.component';
import { GridSearchComponent } from './grid-search/grid-search.component';
import { GridStore } from './grid.store';
import { GridConfiguration, RowData, RowType } from './grid.types';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    GridPaginationComponent,
    GridBodyComponent,
    GridSearchComponent,
    CommonModule,
    LoadingOverlayComponent,
  ],
  providers: [{ provide: GridStore }],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent<T extends RowType> {
  @Input() configuration!: GridConfiguration<T>;

  @Output() public pageSelected = new EventEmitter<number>();

  public get pageSize() {
    return this.configuration.pagination.pageSize;
  }

  public readonly pageChange$ = new Subject<number>();
  public readonly searchChange$ = new BehaviorSubject('');

  public readonly fetchingData$ = new BehaviorSubject(false);

  public readonly currentPage$: Observable<number>;

  public readonly rowData$: Observable<RowData<T>>;

  constructor(private store: GridStore<T>) {
    const searchResult$ = this.searchChange$.pipe(
      tap(() => this.fetchingData$.next(true)),
      switchMap((value) =>
        this.configuration.dataProvider.getData(value, this.pageSize, 0)
      ),
      share()
    );

    const paginationResult$ = this.pageChange$.pipe(
      withLatestFrom(this.searchChange$),
      tap(() => this.fetchingData$.next(true)),
      switchMap(([page, search]) =>
        this.configuration.dataProvider.getData(
          search,
          this.pageSize,
          this.pageSize * page
        )
      ),
      share()
    );

    const updatedPage$ = paginationResult$.pipe(
      withLatestFrom(this.pageChange$),
      map(([_, page]) => page)
    );

    const resetPageOnSearch$ = searchResult$.pipe(map(() => 0));

    this.currentPage$ = merge([updatedPage$, resetPageOnSearch$]).pipe(
      mergeAll(),
      startWith(0)
    );

    const actionResult$ = this.store.cellAction$.pipe(
      filter((action) => !!action.def.refreshData),
      tap(() => this.fetchingData$.next(true)),
      switchMap((action) => action.def.handler(action.row)),
      withLatestFrom(this.searchChange$, this.currentPage$),
      switchMap(([_, search, page]) =>
        this.configuration.dataProvider.getData(
          search,
          this.pageSize,
          this.pageSize * page
        )
      )
    );

    this.rowData$ = merge([
      searchResult$,
      paginationResult$,
      actionResult$,
    ]).pipe(
      mergeAll(),
      tap(() => this.fetchingData$.next(false)),
      share()
    );
  }
}
