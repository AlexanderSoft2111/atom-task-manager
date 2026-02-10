import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // IMPORTANTE

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()), // Transiciones suaves entre páginas
    provideAnimationsAsync(), // Habilita animaciones para Material
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) // Registramos el interceptor aquí
    )
  ]
};
