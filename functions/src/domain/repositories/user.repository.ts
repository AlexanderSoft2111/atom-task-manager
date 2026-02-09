import { 
  RegisterUserDto, 
  UserEntity
} from "../index";

export abstract class UserRepository {
  abstract createUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract getByEmail(email: string): Promise<UserEntity | null>;
}