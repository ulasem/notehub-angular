import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoteService } from '../../../core/services/note';
import { Note } from '../../../core/models/note.model';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-details.html',
  styleUrl: './note-details.css',
})
export class NoteDetails implements OnInit {
  note: Note | null = null;
  isLoading = false;
  error = false;
  formattedDate = '';

  constructor(private route: ActivatedRoute, private noteService: NoteService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isLoading = true;
      this.noteService.fetchNoteById(id).subscribe({
        next: (note) => {
          this.note = note;
          this.formattedDate = note.updatedAt
            ? `Updated at: ${new Date(note.updatedAt).toLocaleDateString()}`
            : `Created at: ${new Date(note.createdAt).toLocaleDateString()}`;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading note:', err);
          this.error = true;
          this.isLoading = false;
        },
      });
    }
  }
}
