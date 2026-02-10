// Lo que enviamos al hacer Login
export interface LoginRequest {
  email: string;
}

// Lo que enviamos al Registrarse (por ahora es igual, pero podría cambiar)
export interface RegisterRequest {
  email: string;
}

// Lo que responde el Backend (según tu prueba en Postman)
export interface AuthResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  email: string;
}
