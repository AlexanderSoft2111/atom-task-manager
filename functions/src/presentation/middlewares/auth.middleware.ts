import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/index';
//import { UserDatasourceImpl,UserRepositoryImpl } from '../../infrastructure/index';

export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    
    // 1. Buscar el header de autorización
    const authorization = req.header('Authorization');
    if (!authorization) {
        res.status(401).json({ error: 'No token provided' });
        return;
    }

    if (!authorization.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Invalid Bearer token' });
        return;
    }
    const token = authorization.split(' ').at(1) || '';

    try {
      // 2. Validar el token
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
          res.status(401).json({ error: 'Invalid token' });
          return;
      }

      // 3. Verificar si el usuario aún existe en DB (Seguridad extra)
      //const datasource = new UserDatasourceImpl(); 
      //const repository = new UserRepositoryImpl(datasource); // Usamos el Repo por consistencia
      
      req.body.user = { id: payload.id };

      next();

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}