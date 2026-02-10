import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../../core/models/auth.models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting() // Importante: Habilita el mocking de HTTP
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Limpiar localStorage antes de cada test para evitar "falsos positivos"
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden peticiones pendientes
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer LOGIN, guardar token y actualizar signals', () => {
    const mockResponse: AuthResponse = {
      user: { id: '123', email: 'test@atom.com' },
      token: 'fake-jwt-token'
    };

    // 1. Llamamos al método
    service.login({ email: 'test@atom.com' }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    // 2. Interceptamos la petición
    const req = httpMock.expectOne(`${apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@atom.com' });

    // 3. Simulamos la respuesta del servidor (Flush)
    req.flush(mockResponse);

    // 4. Verificaciones
    expect(localStorage.getItem('token')).toBe('fake-jwt-token'); // Persistencia
    expect(service.isAuthenticated()).toBeTruthy(); // Signal computada
    expect(service.currentUser()?.email).toBe('test@atom.com'); // Signal de usuario
  });

  it('debería hacer LOGOUT y limpiar estado', () => {
    // Simulamos que ya estábamos logueados
    localStorage.setItem('token', 'old-token');

    // Ejecutamos logout
    service.logout();

    // Verificamos limpieza
    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isAuthenticated()).toBeFalsy();
    expect(service.currentUser()).toBeNull();
  });
});
