import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { NoteService } from '../../../core/services/note';
import { Note } from '../../../core/models/note.model';
import { NoteList } from '../note-list/note-list';
import { SearchBox } from '../../../components/search-box/search-box';
import { Pagination } from '../../../components/pagination/pagination';
import { Modal } from '../../../components/modal/modal';
import { NoteForm } from '../note-form/note-form';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NoteList, SearchBox, Pagination, Modal, NoteForm],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.css',
})
export class NotesPage implements OnInit {
  @ViewChild(NoteForm) noteForm?: NoteForm;

  notes: Note[] = [];
  page = 1;
  search = '';
  totalPages = 1;
  isLoading = false;
  isError = false;
  isModalOpen = false;

  private searchSubject = new Subject<string>();

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.loadNotes();

    this.searchSubject.pipe(debounceTime(500)).subscribe((search) => {
      this.search = search;
      this.page = 1;
      this.loadNotes();
    });
  }

  loadNotes() {
    this.isLoading = true;
    this.isError = false;

    this.noteService.fetchNotes(this.page, this.search).subscribe({
      next: (data) => {
        this.notes = data.notes;
        this.totalPages = data.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading notes:', err);
        this.isError = true;
        this.isLoading = false;
      },
    });
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  onPageChange(page: number) {
    this.page = page;
    this.loadNotes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onNoteCreated(noteData: any) {
    this.noteService.createNote(noteData).subscribe({
      next: () => {
        this.loadNotes();
        this.closeModal();
        if (this.noteForm) {
          this.noteForm.resetForm();
        }
      },
      error: (err) => {
        console.error('Error creating note:', err);
        alert('Failed to create note');
        if (this.noteForm) {
          this.noteForm.isSubmitting = false;
        }
      },
    });
  }

  onNoteDeleted(id: string) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.loadNotes();
      },
      error: (err) => {
        console.error('Error deleting note:', err);
        alert('Failed to delete note');
      },
    });
  }
}
