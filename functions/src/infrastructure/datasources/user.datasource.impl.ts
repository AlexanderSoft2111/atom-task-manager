import { db } from '../../data/firebase'; // Tu conexión Singleton
import { 
  UserDatasource,
  UserEntity,
  RegisterUserDto,
  CustomError 
} from '../../domain/index';
import { UserMapper } from '../mappers/user.mapper';

export class UserDatasourceImpl implements UserDatasource {
  
  private collection = db.collection('users');

  async createUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    try {
      // 1. Verificar si ya existe (Opcional, pero buena práctica)
      const exists = await this.getByEmail(registerUserDto.email);
      if (exists) throw CustomError.badRequest('User already exists');

      // 2. Preparar objeto
      const userObj = {
        email: registerUserDto.email
      };

      // 3. Guardar en Firestore
      const docRef = await this.collection.add(userObj);
      
      // 4. Retornar Entidad creada
      return new UserEntity(registerUserDto.email, docRef.id);

    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    try {
      const snapshot = await this.collection
        .where('email', '==', email)
        .limit(1)
        .get();

      if (snapshot.empty) return null; // Aquí no lanzamos error, retornamos null para que el Caso de Uso decida

      return UserMapper.fromFirestore(snapshot.docs[0]);
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServer();
    }
  }
}