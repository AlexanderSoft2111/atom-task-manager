import { UserDatasource,UserRepository,UserEntity,RegisterUserDto } from '../../domain/index';

export class UserRepositoryImpl implements UserRepository {
  
  // INYECCIÓN DE DEPENDENCIAS
  constructor(
    private readonly datasource: UserDatasource
  ) {}

  createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.datasource.createUser(registerUserDto);
  }

  getByEmail(email: string): Promise<UserEntity | null> {
    return this.datasource.getByEmail(email);
  }
}