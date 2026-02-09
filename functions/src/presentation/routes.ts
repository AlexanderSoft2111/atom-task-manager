import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { TaskRoutes } from './tasks/routes';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();

    // Definimos los prefijos
    router.use('/auth', AuthRoutes.routes);
    router.use('/tasks', TaskRoutes.routes);

    return router;
  }
}