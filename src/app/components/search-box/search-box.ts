import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.html',
  styleUrl: './search-box.css',
})
export class SearchBox {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
