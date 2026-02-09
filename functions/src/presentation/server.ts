import express, { Router } from 'express';
import cors from 'cors'; 

interface Options {
  port: number;
  routes: Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
    this.configure();
  }

  private configure() {
    // 1. Middlewares Globales
    this.app.use(express.json()); // Lectura de raw JSON
    this.app.use(express.urlencoded({ extended: true })); // Lectura de x-www-form-urlencoded
    this.app.use(cors({ origin: true })); // Configuración de CORS

    // 2. Definición de Rutas
    this.app.use(this.routes);

    console.log(`Initializing Server configuration for port ${this.port}...`);
  }

}