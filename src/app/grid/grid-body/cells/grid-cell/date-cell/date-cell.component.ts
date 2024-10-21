import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-cell',
  standalone: true,
  imports: [],
  templateUrl: './date-cell.component.html',
  styleUrl: './date-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCellComponent {
  @Input() public value!: string;
  @Input() public format?: Intl.DateTimeFormatOptions;

  public formatValue() {
    return new Intl.DateTimeFormat('en-US', this.format).format(
      new Date(this.value)
    );
  }
}
