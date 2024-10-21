import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
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
export class ActionCellComponent<T> implements OnInit {
  @Input() public def!: ActionCol<T>;
  @Input() public row!: T;

  constructor(
    public store: GridStore<T>,
    private viewContainer: ViewContainerRef
  ) {}

  public ngOnInit(): void {
    const ref = this.viewContainer.createComponent(this.def.component);
    ref.location.nativeElement.addEventListener('click', () =>
      this.store.cellAction$.next({ def: this.def, row: this.row })
    );
  }
}
