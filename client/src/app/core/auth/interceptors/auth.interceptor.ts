import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../../infrastructure/services/auth.service';

/**
 * Interceptor funcional que adjunta el token de autenticación a las peticiones HTTP salientes.
 * Se ejecuta para cada petición, obtiene el token del `AuthService` y, si existe,
 * clona la petición para añadir el encabezado `Authorization: Bearer <token>`.
 * Esto centraliza la lógica de autenticación de las peticiones a la API.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
