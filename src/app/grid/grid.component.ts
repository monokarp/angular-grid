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
  map,
  merge,
  mergeAll,
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
import { GridConfiguration, RowType } from './grid.types';
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

  public readonly searchResult$ = this.searchChange$.pipe(
    tap(() => this.fetchingData$.next(true)),
    switchMap((value) =>
      this.configuration.dataProvider.getData(value, this.pageSize, 0)
    )
  );

  public readonly paginationResult$ = this.pageChange$.pipe(
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

  public readonly currentPage$ = this.paginationResult$.pipe(
    withLatestFrom(this.pageChange$),
    map(([_, page]) => page),
    startWith(0)
  );

  public readonly paginatedData$ = merge([
    this.searchResult$,
    this.paginationResult$,
  ]).pipe(
    mergeAll(),
    tap(() => this.fetchingData$.next(false)),
    share()
  );
}
