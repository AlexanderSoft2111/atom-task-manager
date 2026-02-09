import { JwtAdapter } from '../../../config/index';
import { UserRepository,CustomError,RegisterUserDto, UserTokenResponse } from '../../index';

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserTokenResponse>;
}

export class RegisterUser implements RegisterUserUseCase {
  
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserTokenResponse> {
    
    // 1. Crear el usuario
    const user = await this.userRepository.createUser(registerUserDto);

    // 2. Generar Token (El usuario nace autenticado)
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