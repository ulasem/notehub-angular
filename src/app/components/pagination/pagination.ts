import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  @Input() pageCount = 1;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();

  get displayPages(): number[] {
    const pages: number[] = [];
    const range = 3;

    for (
      let i = Math.max(1, this.currentPage - range);
      i <= Math.min(this.pageCount, this.currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.pageCount) {
      this.pageChange.emit(page);
    }
  }
}
