import { firestore } from 'firebase-admin';
import { TaskEntity } from '../../domain/index';

export class TaskMapper {
  static fromFirestore(doc: firestore.QueryDocumentSnapshot | firestore.DocumentSnapshot): TaskEntity {
    const data = doc.data();
    if (!data) throw new Error('Documento de tarea vacío');

    // Validación segura de fecha
    let creationDate: Date;
    
    if (data['createdAt'] instanceof firestore.Timestamp) {
      creationDate = data['createdAt'].toDate();
    } else if (data['createdAt'] instanceof Date) {
      creationDate = data['createdAt']; 
    } else {
      creationDate = new Date();
    }

    return new TaskEntity(
      doc.id,
      data['title'],
      data['description'],
      !!data['isCompleted'], 
      creationDate,
      data['userId']
    );
  }
}