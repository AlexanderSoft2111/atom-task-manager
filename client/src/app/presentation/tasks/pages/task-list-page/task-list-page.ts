import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ya no necesitas DatePipe aquí
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Material (Solo lo que usa el Dashboard Control)
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';

// Servicios y Modelos
import { TaskService } from '../../../../infrastructure/services/task.service';
import { AuthService } from '../../../../infrastructure/services/auth.service';
import { Task } from '../../../../core/models/task.models';

// Componentes Hijos
import { TaskDialog } from '../../components/task-dialog/task-dialog';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { LoadingShade } from '../../../shared/components/loading-shade/loading-shade';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskToolbar } from '../../components/task-toolbar/task-toolbar';


@Component({
  selector: 'app-task-list-page',
  imports: [
  CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    LoadingShade,
    TaskCard,
    TaskToolbar
  ],
  templateUrl: './task-list-page.html',
  styleUrl: './task-list-page.scss',
})
export class TaskListPage implements OnInit {

  public taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  public isLoading = signal(true);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false)
    });
  }

  // Actualiza las señales del servicio cuando el usuario interactúa
  onSearch(term: string) {
    this.taskService.searchTerm.set(term);
  }

  onFilterChange(status: any) { // 'all' | 'completed' | 'pending'
    this.taskService.filterStatus.set(status);
  }

  toggleTask(task: Task) {
    const updated = { ...task, isCompleted: !task.isCompleted };
    this.taskService.update(updated).subscribe();
  }

  deleteTask(task: Task) { // Recibe el objeto tarea completo para mostrar el nombre
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '350px',
      data: {
        title: '¿Eliminar Tarea?',
        message: `Estás a punto de borrar "<strong>${task.title}</strong>".<br>Esta acción no se puede deshacer.`,
        confirmText: 'Borrar',
        cancelText: 'Mantener',
        color: 'warn' // Rojo para indicar peligro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.delete(task.id).subscribe();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // MÉTODO PARA CREAR O EDITAR
  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '400px',
      data: task || null, // Si pasamos tarea es EDITAR, si no es CREAR
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // Si canceló, no hacemos nada

      if (task) {
        // --- MODO EDICIÓN ---
        const updatedTask = { ...task, ...result };
        this.taskService.update(updatedTask).subscribe();
      } else {
        // --- MODO CREACIÓN ---
        this.taskService.create(result).subscribe();
      }
    });
  }

}
