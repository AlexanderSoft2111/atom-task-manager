import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Task } from '../../core/models/task.models';
import { tap } from 'rxjs';

export type TaskFilter = 'all' | 'pending' | 'completed';

/**
 * Servicio de gestión de tareas.
 * Actúa como la "fuente única de la verdad" (Single Source of Truth) para el estado de las tareas.
 * Centraliza la lógica de negocio, las llamadas a la API y la gestión del estado reactivo.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  // --- Estado Reactivo con Signals ---

  // Estado privado que contiene la lista completa de tareas. Es la fuente de verdad.
  private _tasks = signal<Task[]>([]);

  // Signals para los criterios de filtrado. Los componentes pueden modificarlas directamente.
  public searchTerm = signal<string>('');
  public filterStatus = signal<TaskFilter>('all');

  // Señal pública de solo lectura para acceder a la lista completa si es necesario.
  public tasks = computed(() => this._tasks());

  /**
   * Señal computada que deriva el estado de las tareas filtradas.
   * Se recalcula automáticamente y de forma eficiente solo cuando `_tasks`, `searchTerm` o `filterStatus` cambian.
   * Esta es la señal que los componentes consumirán para mostrar la lista de tareas.
   */
  public filteredTasks = computed(() => {
    const tasks = this._tasks();
    const term = this.searchTerm().toLowerCase();
    const status = this.filterStatus();

    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(term) ||
                            task.description.toLowerCase().includes(term);

      const matchesStatus = status === 'all'
        ? true
        : status === 'completed' ? task.isCompleted : !task.isCompleted;

      return matchesSearch && matchesStatus;
    });
  });

  /** Carga todas las tareas desde el backend y actualiza el estado local. */
  getAll() {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        tap(tasks => this._tasks.set(tasks))
      );
  }

  /** Crea una nueva tarea y actualiza el estado local tras la confirmación del servidor. */
  create(task: { title: string, description: string }) {
    return this.http.post<Task>(this.apiUrl, task)
      .pipe(
        tap(newTask => {
          this._tasks.update(current => [...current, newTask]);
        })
      );
  }

  /** Actualiza una tarea existente y modifica el estado local tras la confirmación del servidor. */
  update(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task)
        .pipe(
          tap(updatedTask => {
            this._tasks.update(current =>
              current.map(t => t.id === updatedTask.id ? updatedTask : t)
            );
          })
        );
    }

  /** Elimina una tarea por su ID y la quita del estado local tras la confirmación del servidor. */
  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          this._tasks.update(current => current.filter(t => t.id !== id));
        })
      );
  }

}
