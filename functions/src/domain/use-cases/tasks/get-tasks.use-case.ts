import { TaskEntity,TaskRepository } from '../../index';

export interface GetTasksUseCase {
  execute(userId: string): Promise<TaskEntity[]>;
}

export class GetTasks implements GetTasksUseCase {
  constructor(
    private readonly repository: TaskRepository
  ) {}

  execute(userId: string): Promise<TaskEntity[]> {
    return this.repository.getAll(userId);
  }
}