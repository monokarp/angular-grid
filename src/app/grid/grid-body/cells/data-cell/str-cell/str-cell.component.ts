import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-str-cell',
  standalone: true,
  imports: [],
  templateUrl: './str-cell.component.html',
  styleUrl: './str-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StrCellComponent {
  @Input() public value!: string;
}
