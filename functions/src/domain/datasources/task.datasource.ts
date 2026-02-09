import { TaskEntity, CreateTaskDto,UpdateTaskDto } from '../index';

export abstract class TaskDatasource {
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
  abstract getAll(userId: string): Promise<TaskEntity[]>;
  abstract update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity>; // Ahora usa DTO
  abstract delete(id: string): Promise<void>;
}