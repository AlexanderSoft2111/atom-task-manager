import { JwtAdapter } from '../../../config/index';
import { UserRepository,CustomError,UserTokenResponse } from '../../index';

interface LoginUserUseCase {
  execute(email: string): Promise<UserTokenResponse>;
}

export class LoginUser implements LoginUserUseCase {
  
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string): Promise<UserTokenResponse> {
    
    // 1. Verificar si el usuario existe
    const user = await this.userRepository.getByEmail(email);
    if (!user) throw CustomError.notFound('User not found'); // Esto dispara el 404

    // 2. Generar Token
    const token = await JwtAdapter.generateToken({ email: user.email, id: user.id });
    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}