export class UpdateTaskDto {
  private constructor(
    public readonly id: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly isCompleted?: boolean,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateTaskDto?] {
    const { id, title, description, isCompleted } = object;

    if (!id) return ['Missing id'];

    // Si queremos obligar a que al menos un campo venga para actualizar:
    if (title === undefined && description === undefined && isCompleted === undefined) {
         return ['Missing values to update'];
       } 
    

    return [
      undefined,
      new UpdateTaskDto(id, title, description, isCompleted)
    ];
  }
}