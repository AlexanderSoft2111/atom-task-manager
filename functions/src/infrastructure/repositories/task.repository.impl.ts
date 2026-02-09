import { 
  TaskDatasource,
  TaskRepository,
  TaskEntity,
  CreateTaskDto,
  UpdateTaskDto 
} from '../../domain/index';

export class TaskRepositoryImpl implements TaskRepository {

  // AQUÍ ESTÁ LA MAGIA: Inyección de dependencias
  // Recibimos la clase abstracta (TaskDatasource), no la implementación directa
  constructor(
    private readonly datasource: TaskDatasource
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.datasource.create(createTaskDto);
  }

  getAll(userId: string): Promise<TaskEntity[]> {
    return this.datasource.getAll(userId);
  }

  update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.datasource.update(updateTaskDto);
  }

  delete(id: string): Promise<void> {
    return this.datasource.delete(id);
  }
}