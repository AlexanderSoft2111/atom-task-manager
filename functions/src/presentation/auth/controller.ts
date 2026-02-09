import { Request, Response } from 'express';
import { RegisterUserDto,UserRepository,CustomError,RegisterUser,LoginUser } from '../../domain/index';

export class AuthController {

    constructor(
    private readonly userRepository: UserRepository,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`); 
    return res.status(500).json({ error: 'Internal server error' });
  };

  registerUser = (req: Request, res: Response) => {
    // 1. Validar DTO
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    // 2. Ejecutar Caso de Uso
    return new RegisterUser(this.userRepository)
      .execute(registerDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });

    return new LoginUser(this.userRepository)
      .execute(email)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  };
}