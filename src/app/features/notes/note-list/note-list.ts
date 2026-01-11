import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Note } from '../../../core/models/note.model';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  @Input() notes: Note[] = [];
  @Output() noteDeleted = new EventEmitter<string>();

  deletingId: string | null = null;

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.deletingId = id;
      this.noteDeleted.emit(id);
    }
  }
}
