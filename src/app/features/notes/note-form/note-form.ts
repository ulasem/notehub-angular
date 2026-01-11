import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NoteTag } from '../../../core/models/note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<any>();

  noteForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      content: ['', [Validators.maxLength(500)]],
      tag: ['Todo' as NoteTag, Validators.required],
    });
  }

  get title() {
    return this.noteForm.get('title');
  }

  get content() {
    return this.noteForm.get('content');
  }

  onSubmit() {
    if (this.noteForm.valid) {
      this.isSubmitting = true;
      this.created.emit(this.noteForm.value);
    }
  }

  onCancel() {
    this.close.emit();
  }

  resetForm() {
    this.isSubmitting = false;
    this.noteForm.reset({ tag: 'Todo' });
  }
}
