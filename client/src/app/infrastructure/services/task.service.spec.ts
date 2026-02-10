import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { Task } from '../../core/models/task.models';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/tasks`;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', description: 'Desc 1', isCompleted: false, userId: 'u1', createdAt: new Date().toISOString() },
    { id: '2', title: 'Task 2', description: 'Desc 2', isCompleted: true, userId: 'u1', createdAt: new Date().toISOString() }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getAll() debería actualizar el signal "tasks" con los datos del servidor', () => {
    service.getAll().subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);

    // Verificamos que el signal público (computed) tenga los datos
    // Nota: filteredTasks depende de _tasks, así que esto prueba la cadena reactiva
    expect(service.tasks().length).toBe(2);
    expect(service.tasks()[0].title).toBe('Task 1');
  });

  it('create() debería añadir la tarea al estado local (Optimistic/Signal update)', () => {
    // Estado inicial ficticio
    // (Angular Signals son difíciles de "setear" desde fuera si son privados,
    // pero probaremos que al crear, la lista crece desde 0 a 1)

    const newTask = { title: 'Nueva Tarea', description: 'Test' };
    const createdTaskResponse: Task = { ...newTask, id: '3', isCompleted: false, userId: 'u1', createdAt: new Date().toISOString() };

    service.create(newTask).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(createdTaskResponse);

    // Verificamos que el signal ahora contiene la nueva tarea
    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].title).toBe('Nueva Tarea');
  });

  it('delete() debería remover la tarea del estado local', () => {
    // 1. Primero cargamos datos para tener algo que borrar
    service.getAll().subscribe();
    const reqLoad = httpMock.expectOne(apiUrl);
    reqLoad.flush(mockTasks);

    expect(service.tasks().length).toBe(2); // Confirmamos que hay 2

    // 2. Borramos la tarea con ID '1'
    service.delete('1').subscribe();

    const reqDelete = httpMock.expectOne(`${apiUrl}/1`);
    expect(reqDelete.request.method).toBe('DELETE');
    reqDelete.flush(null); // Respuesta vacía del backend

    // 3. Verificamos que el signal se actualizó (filtro el id 1)
    expect(service.tasks().length).toBe(1);
    expect(service.tasks()[0].id).toBe('2'); // Solo queda la tarea 2
  });

  it('filteredTasks() debería filtrar por término de búsqueda', () => {
    // Cargar datos
    service.getAll().subscribe();
    httpMock.expectOne(apiUrl).flush(mockTasks);

    // Cambiar signal de búsqueda
    service.searchTerm.set('Task 1');

    // Verificar el computed signal
    expect(service.filteredTasks().length).toBe(1);
    expect(service.filteredTasks()[0].id).toBe('1');
  });
});
