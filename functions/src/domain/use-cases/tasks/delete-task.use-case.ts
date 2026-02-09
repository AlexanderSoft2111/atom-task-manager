import { TaskRepository } from '../../index';

export interface DeleteTaskUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteTask implements DeleteTaskUseCase {
  constructor(
    private readonly repository: TaskRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}