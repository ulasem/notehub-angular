import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note, FetchNotesResponse, CreateNotePayload } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchNotes(page: number = 1, search: string = ''): Observable<FetchNotesResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('perPage', '12')
      .set('search', search);

    return this.http.get<FetchNotesResponse>(`${this.apiUrl}/notes`, { params });
  }

  fetchNoteById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/notes/${id}`);
  }

  createNote(note: CreateNotePayload): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/notes`, note);
  }

  deleteNote(id: string): Observable<Note> {
    return this.http.delete<Note>(`${this.apiUrl}/notes/${id}`);
  }
}
