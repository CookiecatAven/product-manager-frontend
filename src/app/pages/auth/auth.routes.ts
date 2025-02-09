import { Routes } from '@angular/router';
import { resolve } from '@angular/compiler-cli';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import('./logout/logout.component').then(m => m.LogoutComponent)
  }
];
