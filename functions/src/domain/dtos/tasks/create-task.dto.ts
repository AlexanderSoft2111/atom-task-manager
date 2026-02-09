export class CreateTaskDto {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly userId: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateTaskDto?] {
    const { title, description, userId } = object;

    if (!title) return ['Missing title'];
    if (!userId) return ['Missing userId']; // Seguridad

    return [undefined, new CreateTaskDto(title, description || '', userId)];
  }
}