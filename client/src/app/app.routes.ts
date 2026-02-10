import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./presentation/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./presentation/tasks/tasks.routes').then(m => m.TASKS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
