import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, map } from 'rxjs';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent extends BaseComponent implements AfterViewInit {
  @Input() public delay!: number;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @Output() public valueChanged = new EventEmitter<string>();

  public ngAfterViewInit() {
    fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(this.delay),
        map((event: InputEvent) => (event.target as HTMLInputElement).value),
        this.takeUntilDispose()
      )
      .subscribe((value) => this.valueChanged.emit(value));
  }
}
