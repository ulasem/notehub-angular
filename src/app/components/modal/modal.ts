import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.onEsc);
  }

  ngOnDestroy() {
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.close.emit();
    }
  };

  onBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.close.emit();
    }
  }
}
