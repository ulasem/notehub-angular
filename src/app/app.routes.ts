import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { NotesPage } from './features/notes/notes-page/notes-page';
import { NoteDetails } from './features/notes/note-details/note-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'notes', component: NotesPage },
  { path: 'notes/:id', component: NoteDetails },
  { path: '**', redirectTo: '' },
];
