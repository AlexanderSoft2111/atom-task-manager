# Atom Task Manager 🚀

[![CI/CD](https://github.com/AlexanderSoft2111/atom-task-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexanderSoft2111/atom-task-manager/actions/workflows/ci.yml)
[![Angular](https://img.shields.io/badge/Angular-17%2B-red)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Functions%20%26%20Firestore-orange)](https://firebase.google.com/)
[![Testing](https://img.shields.io/badge/Vitest-Passing-brightgreen)]()

Solución al Challenge Técnico FullStack de Atomchat. Una aplicación de gestión de tareas construida con **Clean Architecture**, principios **SOLID** y un enfoque moderno en Frontend.

## Estructura del Monorepo

El proyecto está organizado en dos directorios principales para separar responsabilidades:

- **`/client`**: Frontend (Angular Standalone). Implementa lógica de UI, Signals y componentes reutilizables.
- **`/functions`**: Backend (Node.js/Express). Implementa la lógica de negocio, Repositorios y Endpoints desplegados en Firebase Cloud Functions.

## Arquitectura y Decisiones de Diseño

### Frontend (Clean Architecture)
Se implementó una arquitectura por capas para desacoplar la UI de la lógica de negocio y la infraestructura.
- **Presentation Layer**: Componentes "Smart" (`TaskListPage`) que orquestan datos y componentes "Dumb" (`TaskCardComponent`) reutilizables.
- **Core Layer**: Modelos (`Task`, `User`) y Guards de seguridad.
- **Infrastructure Layer**: Servicios (`TaskService`) que implementan la comunicación HTTP y manejo de estado reactivo.

**¿Por qué Signals?**
Se optó por **Angular Signals** para la gestión del estado local debido a su simplicidad y rendimiento granular, eliminando la necesidad de librerías externas complejas para este caso de uso.

### Backend (Clean Architecture)
- **Domain**: Entidades, Interfaces de Repositorio y Errores personalizados.
- **Use Cases**: Lógica pura de negocio encapsulada (ej: `CreateTask`, `GetTasks`).
- **Infrastructure**: Implementación concreta de repositorios (Firestore) y controladores (Express).

**Patrones Utilizados:**
- **Repository Pattern**: Abstrae la persistencia de datos (Firestore).
- **Factory Pattern (Mappers)**: Centraliza la transformación de datos entre capas (DTO <-> Entidad).
- **Dependency Injection**: Facilita el testing y desacoplamiento.

## Testing

El proyecto cuenta con una suite de pruebas unitarias implementada con **Vitest**.
- **Coverage**: Se prueban Componentes (Inputs/Outputs), Servicios (HTTP Mocking) y Guards.
- **Ejecución**: `npm run test` en el directorio `/client`.

## Instalación y Ejecución

### Prerrequisitos
- Node.js v18+
- Angular CLI
- Firebase CLI

### 1. Clonar el repositorio
```bash
git clone [https://github.com/AlexanderSoft2111/atom-task-manager.git](https://github.com/AlexanderSoft2111/atom-task-manager.git)
cd atom-task-manager