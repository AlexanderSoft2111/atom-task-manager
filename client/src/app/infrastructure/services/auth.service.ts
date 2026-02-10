import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../../core/models/auth.models';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
/**
 * Servicio de autenticación.
 * Gestiona el estado de autenticación del usuario (login, registro, logout)
 * y almacena el token de sesión de forma reactiva usando Signals.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // --- Estado Reactivo con Signals ---

  // Estado privado: almacena el objeto de usuario y el token.
  private _currentUser = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  // Estado público de solo lectura: expone el usuario actual y el estado de autenticación.
  // `isAuthenticated` se deriva automáticamente del estado del token.
  public currentUser = computed(() => this._currentUser());
  public isAuthenticated = computed(() => !!this._token());

  /**
   * Realiza la petición de login y, si es exitosa, actualiza el estado de autenticación.
   * @param credentials - Email del usuario.
   * @returns Un Observable que emite `true` en caso de éxito.
   */
  login(credentials: LoginRequest): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.setAuthState(response)),
        map(() => true),
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Realiza la petición de registro y, si es exitosa, actualiza el estado de autenticación.
   * @param credentials - Email del usuario.
   * @returns Un Observable que emite `true` en caso de éxito.
   */
  register(credentials: RegisterRequest): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, credentials)
      .pipe(
        tap(response => this.setAuthState(response)),
        map(() => true),
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Cierra la sesión del usuario, limpiando el estado y el almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._token.set(null);
  }

  /**
   * Método privado para centralizar la actualización del estado y el localStorage.
   */
  private setAuthState(response: AuthResponse): void {
    const { user, token } = response;
    localStorage.setItem('token', token);
    this._currentUser.set(user);
    this._token.set(token);
  }

  /**
   * Devuelve el token de autenticación actual. Usado por el interceptor.
   */
  getToken(): string | null {
    return this._token();
  }
}
