import { firestore } from 'firebase-admin';
import { UserEntity,CustomError } from '../../domain/index';

export class UserMapper {
  static fromFirestore(doc: firestore.DocumentSnapshot): UserEntity {
    const data = doc.data();
    // Validacion de seguridad: Si no hay data, algo anda muy mal en la BD
    if (!data) throw CustomError.internalServer('User data not found in database');
    
    return new UserEntity(
      data['email'],
      doc.id
    );
  }
}