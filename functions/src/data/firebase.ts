import admin from 'firebase-admin';

// PATRÓN SINGLETON: Inicializa la app solo si no existe ya
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();