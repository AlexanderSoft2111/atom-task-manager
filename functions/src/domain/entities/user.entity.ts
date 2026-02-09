export class UserEntity {
  constructor(
    public email: string,
    public id: string // El ID es opcional al crear, pero obligatorio al leer
  ) {}
}