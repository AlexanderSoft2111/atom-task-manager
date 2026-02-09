import { Request, Response } from 'express';
import { CreateTaskDto,UpdateTaskDto,TaskRepository,CustomError } from '../../domain/index';

// Importamos los Casos de Uso
import { CreateTask,GetTasks,UpdateTask,DeleteTask } from '../../domain/index';

export class TaskController {

  // Inyectamos el repositorio para pasárselo a los casos de uso
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  createTask = (req: Request, res: Response) => {
    const userId = req.body.user.id; // Viene del token (AuthMiddleware)
    const [error, createTaskDto] = CreateTaskDto.create({ ...req.body, userId });
    
    if (error) return res.status(400).json({ error });

    return new CreateTask(this.taskRepository)
      .execute(createTaskDto!)
      .then(task => res.status(201).json(task)) // 201 Created es buena práctica
      .catch(error => this.handleError(error, res));
  };

  getTasks = (req: Request, res: Response) => {
    const userId = req.body.user.id;

    new GetTasks(this.taskRepository)
      .execute(userId)
      .then(tasks => res.json(tasks))
      .catch(error => this.handleError(error, res));
  };

  updateTask = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTaskDto] = UpdateTaskDto.create({ ...req.body, id });
    
    if (error) return res.status(400).json({ error });

    return new UpdateTask(this.taskRepository)
      .execute(updateTaskDto!)
      .then(task => res.json(task))
      .catch(error => this.handleError(error, res));
  };

  deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    
    return new DeleteTask(this.taskRepository)
      .execute(id)
      .then(() => res.json({ message: 'Task deleted' }))
      .catch(error => this.handleError(error, res));
  };
}