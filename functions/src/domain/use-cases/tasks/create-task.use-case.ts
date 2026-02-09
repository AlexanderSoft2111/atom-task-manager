import { TaskEntity,TaskRepository,CreateTaskDto } from '../../index';

export interface CreateTaskUseCase {
  execute(dto: CreateTaskDto): Promise<TaskEntity>;
}

export class CreateTask implements CreateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository
  ) {}

  execute(dto: CreateTaskDto): Promise<TaskEntity> {
    return this.repository.create(dto);
  }
}