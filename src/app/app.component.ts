import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { GridConfiguration } from './grid/grid.types';
import { TestDataService } from './test-data/test-data.service';
import { UserData } from './test-data/test-data.types';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

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
        {
          prop: 'registered',
          label: 'Date registered',
          type: 'date',
          format: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          },
        },
        {
          prop: 'lastLogin',
          label: 'Last login',
          type: 'date',
          format: {
            dateStyle: 'short',
            timeStyle: 'short',
          },
        },
        {
          action: 'delete',
          label: '',
          component: DeleteButtonComponent,
          handler: (row) => this.dataService.delete(row.id),
          refreshData: true,
        },
      ],
      dataProvider: {
        getData: (searchValue: string, top: number, skip: number) =>
          this.dataService.getData(searchValue, top, skip),
      },
    };
  }
}
