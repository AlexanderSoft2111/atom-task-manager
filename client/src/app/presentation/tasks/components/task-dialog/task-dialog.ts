import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../../../core/models/task.models';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog implements OnInit{

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<TaskDialog>);
  public data: Task | null = inject(MAT_DIALOG_DATA); // Recibimos la tarea si es edición

  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['']
  });

  ngOnInit(): void {
    // Si llegó data (edición), llenamos el formulario
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSave(): void {
    if (this.form.valid) {
      // Cerramos el modal y devolvemos los datos del formulario
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
