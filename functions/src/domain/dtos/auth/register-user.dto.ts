import { Validators } from '../../../config/index';

export class RegisterUserDto {
  private constructor(
    public readonly email: string
  ) {}

  // Factory Method para validaciones
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { email } = object;

    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Email is not valid'];

    return [undefined, new RegisterUserDto(email)];
  }
}