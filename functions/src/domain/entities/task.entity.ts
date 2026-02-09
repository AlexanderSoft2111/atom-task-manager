export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public isCompleted: boolean,
    public createdAt: Date,
    public userId: string // Relación con el usuario
  ) {}
}