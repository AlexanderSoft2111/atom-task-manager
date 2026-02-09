import jwt from 'jsonwebtoken';
import { envs } from './envs';

export class JwtAdapter {

  // Cambiamos el tipo de duration a 'any' en la firma o hacemos cast abajo.
  // Aquí mantenemos string para que sea limpio al llamarlo.
  static async generateToken(payload: any, duration: string = '2h'): Promise<string | null> {
    
    return new Promise((resolve) => {
      const options = { expiresIn: duration as any };

      jwt.sign(payload, envs.JWT_SEED, options, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, envs.JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}