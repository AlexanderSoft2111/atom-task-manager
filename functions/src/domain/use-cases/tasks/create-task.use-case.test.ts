import { describe, test, expect, vi } from 'vitest';
import { CreateTask } from './create-task.use-case';
import { TaskEntity } from '../../entities/task.entity';

// 1. DESCRIBE: Agrupa pruebas relacionadas. Es como el "título" del reporte.
describe('CreateTask UseCase', () => {

  // 2. MOCK (El "Doble de Acción"): 
  // No queremos guardar en la base de datos real. 
  // Creamos un objeto falso que "finge" ser el repositorio.
  const mockTaskRepository = {
    create: vi.fn(), // vi.fn() es una "función espía". Registra si fue llamada.
    getAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  // 3. PREPARACIÓN (Arrange):
  // Instanciamos el Caso de Uso, pero le inyectamos nuestro repositorio falso.
  // Así, el caso de uso cree que habla con la BD, pero habla con nuestro espía.
  const createTaskUseCase = new CreateTask(mockTaskRepository as any);

  // 4. TEST (La prueba individual):
  test('debe llamar al repositorio con los datos correctos', async () => {
    
    // DATOS DE PRUEBA
    const datosEntrada = { title: 'Test', description: 'Desc', userId: '123' };
    
    // Lo que esperamos que devuelva el "repositorio falso"
    const tareaEsperada = new TaskEntity('id-1', 'Test', 'Desc', false, new Date(), '123');
    
    // Programamos al espía: "Cuando te llamen a 'create', devuelve esto inmediatamente"
    mockTaskRepository.create.mockResolvedValue(tareaEsperada);

    // 5. ACCIÓN (Act): Ejecutamos la función real que queremos probar
    const resultado = await createTaskUseCase.execute(datosEntrada as any);

    // 6. VERIFICACIÓN (Assert): ¿Pasó lo que esperábamos?
    
    // A. ¿El resultado es igual al objeto esperado?
    expect(resultado).toBe(tareaEsperada);
    
    // B. ¿El repositorio fue llamado? (Importante para saber que no se saltó la lógica)
    expect(mockTaskRepository.create).toHaveBeenCalled();
  });
});