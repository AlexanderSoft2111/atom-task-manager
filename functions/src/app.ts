import functions from 'firebase-functions';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

// 1. Crear instancia del servidor (Aquí se ejecuta el constructor y se configura todo)
const server = new Server({
  port: envs.PORT,
  routes: AppRoutes.routes,
});

// 2. Exportar la función para Firebase
// Le pasamos 'server.app' que es la instancia de Express ya configurada
export const api = functions.https.onRequest(server.app);

