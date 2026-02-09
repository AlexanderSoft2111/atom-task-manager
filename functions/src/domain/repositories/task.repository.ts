import { 
  CreateTaskDto, 
  TaskEntity, 
  UpdateTaskDto
} from "../index";


export abstract class TaskRepository {
  // Ahora recibe DTO
  abstract create(createTaskDto: CreateTaskDto): Promise<TaskEntity>;
  abstract getAll(userId: string): Promise<TaskEntity[]>;
  abstract update(task: UpdateTaskDto): Promise<TaskEntity>; // Update suele recibir entidad o UpdateTaskDto
  abstract delete(id: string): Promise<void>;
}