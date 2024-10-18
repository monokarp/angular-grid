import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, map, takeUntil } from 'rxjs';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-grid-search',
  standalone: true,
  imports: [],
  templateUrl: './grid-search.component.html',
  styleUrl: './grid-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridSearchComponent
  extends BaseComponent
  implements AfterViewInit
{
  @Input() public delay!: number;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @Output() public valueChanged = new EventEmitter<string>();

  public ngAfterViewInit() {
    fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(this.delay),
        map((event: InputEvent) => (event.target as HTMLInputElement).value),
        this.takeUntilDispose(),
      )
      .subscribe((value) => this.valueChanged.emit(value));
  }
}
