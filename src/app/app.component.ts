import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  map,
  merge,
  mergeAll,
  share,
  startWith,
  Subject,
  switchMap,
  withLatestFrom
} from 'rxjs';
import { GridComponent } from './grid/grid.component';
import { GridConfiguration } from './grid/grid.types';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TestDataService } from './test-data/test-data.service';
import { UserData } from './test-data/test-data.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent, SearchBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly gridConfiguration: GridConfiguration<UserData>;

  public readonly searchInputDelayMs = 300;

  public readonly page$ = new Subject<number>();
  public readonly search$ = new BehaviorSubject<string>('');

  private readonly paginatedData$ = merge([
    this.search$.pipe(
      startWith(''),
      switchMap((value) => {
        const { pageSize } = this.gridConfiguration.pagination;

        return this.dataService.getData(value, pageSize, 0);
      })
    ),
    this.page$.pipe(
      withLatestFrom(this.search$),
      switchMap(([page, search]) => {
        const { pageSize } = this.gridConfiguration.pagination;

        return this.dataService.getData(search, pageSize, pageSize * page);
      })
    ),
  ]).pipe(
    mergeAll(),
    share()
  );

  public readonly rowData$ = this.paginatedData$.pipe(
    map((data) => data.pageRows)
  );
  public readonly totalRows$ = this.paginatedData$.pipe(
    map((data) => data.totalRowCount)
  );

  constructor(private dataService: TestDataService) {
    this.gridConfiguration = {
      pagination: {
        pageSize: 10,
      },
      columnDefinitions: [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: 'Name', type: 'string' },
        { prop: 'email', label: 'E-mail', type: 'string' },
        { prop: 'registered', label: 'Date registered', type: 'date' },
        // TODO Need to also pass date format here
        { prop: 'lastLogin', label: 'Last login', type: 'date' },
        // TODO Add actions
      ],
    };
  }
}
