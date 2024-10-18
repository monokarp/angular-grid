import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { TestDataService } from './test-data/test-data.service';
import { UserData } from './test-data/test-data.types';
import { GridConfiguration } from './grid/grid.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly gridConfiguration: GridConfiguration<UserData>;

  constructor(private dataService: TestDataService) {
    this.gridConfiguration = {
      pagination: {
        pageSize: 10,
      },
      search: {
        inputDelayMs: 300,
      },
      columnDefinitions: [
        { prop: 'id', label: 'ID' },
        { prop: 'name', label: 'Name', type: 'string' },
        { prop: 'email', label: 'E-mail', type: 'string' },
        { prop: 'registered', label: 'Date registered', type: 'date' },
        // TODO Need to also pass date format here
        { prop: 'lastLogin', label: 'Last login', type: 'date' },
      ],
      rowData: this.dataService.all(),
    };

    // rowData: {
    //   getPage: (pageNumber: number) =>
    //     this.dataService.getRows(
    //       pageNumber * this.gridConfiguration.pagination.pageSize,
    //       this.gridConfiguration.pagination.pageSize
    //     ),
    //   countRows: () => this.dataService.countAll(),
    // }
  }
}
