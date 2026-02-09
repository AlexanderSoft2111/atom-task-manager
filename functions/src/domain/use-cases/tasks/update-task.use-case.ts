import { TaskEntity,TaskRepository,UpdateTaskDto } from '../../index';

export interface UpdateTaskUseCase {
  execute(dto: UpdateTaskDto): Promise<TaskEntity>;
}

export class UpdateTask implements UpdateTaskUseCase {
  constructor(
    private readonly repository: TaskRepository
  ) {}

  execute(dto: UpdateTaskDto): Promise<TaskEntity> {
    return this.repository.update(dto);
  }
}