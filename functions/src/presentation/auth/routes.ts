import { Router } from 'express';
import { AuthController } from './controller';
import { UserDatasourceImpl,UserRepositoryImpl } from '../../infrastructure/index';

export class AuthRoutes {

  static get routes(): Router {
    const router = Router();

    // 1. Creamos las instancias 
    const datasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    
    // 2. Inyectamos el repositorio al controlador
    const controller = new AuthController(userRepository);

    // 3. Definimos las rutas
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);


    return router;
  }
}