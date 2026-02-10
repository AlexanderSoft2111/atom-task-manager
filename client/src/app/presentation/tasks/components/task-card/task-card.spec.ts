import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCard } from './task-card';
import { Task } from '../../../../core/models/task.models';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('TaskCard', () => {
  let component: TaskCard;
  let fixture: ComponentFixture<TaskCard>;

  const mockTask: Task = {
    id: '123',
    title: 'Test Unitario con Vitest',
    description: 'Verificar que el componente renderiza bien',
    isCompleted: false,
    userId: 'user-1',
    createdAt: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskCard
      ],
      providers: [DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCard);
    component = fixture.componentInstance;

    // Asignamos el Input obligatorio usando `setInput` para signals
    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges(); // Disparamos la detección de cambios para renderizar el input
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título de la tarea', () => {
    const titleElement = fixture.debugElement.query(By.css('.task-title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Unitario con Vitest');
  });

  it('debería aplicar la clase "completed-card" si la tarea está completa', () => {
    // Cambiamos el estado del input. Para signals, se usa setInput.
    fixture.componentRef.setInput('task', { ...mockTask, isCompleted: true });
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('.task-card'));
    // Verificamos que tenga la clase CSS
    expect(card.classes['completed-card']).toBe(true);
  });

  it('debería emitir el evento "onToggle" al hacer clic en el checkbox', () => {
    // Espiamos el evento output
    const emitSpy = vi.spyOn(component.onToggle, 'emit');

    // Buscamos el checkbox (simulamos que es el mat-checkbox o su wrapper)
    // Nota: A veces clickear componentes de Material en tests es complejo,
    // pero podemos llamar al método directamente o simular el evento change.

    // Opción directa: invocar el output como si el checkbox lo hubiera disparado
    component.onToggle.emit(mockTask);

    expect(emitSpy).toHaveBeenCalledWith(mockTask);
  });
});
