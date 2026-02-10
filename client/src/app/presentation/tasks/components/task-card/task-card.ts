import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from '../../../../core/models/task.models';

@Component({
  selector: 'app-task-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule,
    DatePipe
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  // --- Entradas y Salidas del Componente (API Pública) ---

  // Define la entrada principal del componente usando una signal. Es obligatoria.
  task = input.required<Task>();

  // Define los eventos de salida que el componente puede emitir.
  onEdit = output<Task>();   // Emite la tarea cuando el usuario solicita editarla.
  onDelete = output<Task>(); // Emite la tarea cuando el usuario solicita eliminarla.
  onToggle = output<Task>(); // Emite la tarea cuando el usuario cambia su estado de completado.
}
