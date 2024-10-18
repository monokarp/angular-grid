import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-grid-pagination',
  standalone: true,
  imports: [],
  templateUrl: './grid-pagination.component.html',
  styleUrl: './grid-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridPaginationComponent {
  @Input() public pageSize!: number;
  @Input() public totalRows!: number;

  @Output() public pageSelected = new EventEmitter<number>();

  public currentPage = 0;
  private readonly pageButtonSpread = 2;

  public getPaginationLabel() {
    return `Currently showing ${
      this.currentPage * this.pageSize + 1
    } to ${Math.min(
      (this.currentPage + 1) * this.pageSize,
      this.totalRows
    )} of ${this.totalRows} records`;
  }

  public pageButtonsRange(): number[] {
    const range = [];
    const length = 2 * this.pageButtonSpread + 1;
    const totalPages = this.totalPages();

    const start = Math.max(0, this.currentPage - this.pageButtonSpread);
    const end = Math.min(
      this.currentPage + this.pageButtonSpread,
      totalPages - 1
    );

    const gap = Math.max(0, length - (end - start + 1));

    const offsetStart = Math.max(0, start - gap);
    const offsetEnd = Math.min(totalPages - 1, end + gap);

    for (let i = offsetStart; i <= offsetEnd; i++) {
      range.push(i);
    }

    return range;
  }

  public first() {
    this.setPage(0);
  }

  public previous() {
    if (this.currentPage > 0) {
      this.setPage(this.currentPage - 1);
    }
  }

  public setPage(value: number) {
    this.currentPage = value;
    this.pageSelected.emit(value);
  }

  public next() {
    if (this.currentPage < this.totalPages() - 1) {
      this.setPage(this.currentPage + 1);
    }
  }

  public last() {
    this.setPage(this.totalPages() - 1);
  }

  private totalPages(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }
}
