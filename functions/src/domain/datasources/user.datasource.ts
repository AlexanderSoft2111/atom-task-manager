import { UserEntity, RegisterUserDto } from '../index';
export abstract class UserDatasource {
  abstract createUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract getByEmail(email: string): Promise<UserEntity | null>;
}