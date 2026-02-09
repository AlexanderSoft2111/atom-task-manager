import { Router } from 'express';
import { TaskController } from './controller';
import { TaskDatasourceImpl,TaskRepositoryImpl } from '../../infrastructure/index';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class TaskRoutes {

  static get routes(): Router {
    const router = Router();

    const datasource = new TaskDatasourceImpl();
    const taskRepository = new TaskRepositoryImpl(datasource);
    const controller = new TaskController(taskRepository);

    // Middleware de Auth aplicado a TODAS las rutas de abajo
    router.use(AuthMiddleware.validateJWT);

    router.get('/', controller.getTasks);
    router.post('/', controller.createTask);
    router.put('/:id', controller.updateTask);
    router.delete('/:id', controller.deleteTask);

    return router;
  }
}