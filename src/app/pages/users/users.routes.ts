import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users.component').then(m => m.UsersComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  }
];
