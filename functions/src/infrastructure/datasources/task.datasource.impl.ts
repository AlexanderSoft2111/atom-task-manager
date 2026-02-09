import { db } from '../../data/firebase';
import { 
  TaskDatasource,
  TaskEntity,
  CreateTaskDto,
  UpdateTaskDto,
  CustomError 
} from '../../domain/index';
import { TaskMapper } from '../index';

export class TaskDatasourceImpl implements TaskDatasource {
  
  private collection = db.collection('tasks');

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const taskObj = {
        title: createTaskDto.title,
        description: createTaskDto.description,
        isCompleted: false,
        createdAt: new Date(),
        userId: createTaskDto.userId
      };

      const docRef = await this.collection.add(taskObj);
      const newDoc = await docRef.get();
      
      return TaskMapper.fromFirestore(newDoc);

    } catch (error) {
      // Si ya es un error personalizado, lo dejamos pasar
      if (error instanceof CustomError) throw error;
      // Si no, es un error desconocido de infraestructura
      throw CustomError.internalServer();
    }
  }

  async getAll(userId: string): Promise<TaskEntity[]> {
    try {
      const snapshot = await this.collection
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return snapshot.docs.map(doc => TaskMapper.fromFirestore(doc));

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  async update(updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    try {
      const { id, ...dataToUpdate } = updateTaskDto;

      // Paso 1: Verificar si existe antes de actualizar
      const docRef = this.collection.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw CustomError.notFound(`Task with id ${id} not found`);
      }

      // Paso 2: Actualizar
      await docRef.update(dataToUpdate);

      // Paso 3: Retornar actualizado
      const updatedDoc = await docRef.get();
      return TaskMapper.fromFirestore(updatedDoc);

    } catch (error) {
      // Aquí atrapamos el error notFound que lanzamos arriba
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = this.collection.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        throw CustomError.notFound(`Task with id ${id} not found`);
      }

      await docRef.delete();

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}