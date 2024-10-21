import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GridStore } from '../../../../grid.store';
import { ActionCol } from '../../../../grid.types';

@Component({
  selector: 'app-action-cell',
  standalone: true,
  imports: [],
  templateUrl: './action-cell.component.html',
  styleUrl: './action-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionCellComponent<T> {
  @Input() public def!: ActionCol<T>;
  @Input() public row!: T;

  constructor(public store: GridStore<T>) {}

  public emitAction() {
    this.store.cellAction$.next({ def: this.def, row: this.row });
  }
}
