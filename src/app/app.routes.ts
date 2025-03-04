import { Routes } from '@angular/router';

// @ts-ignore
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.routes').then(m => m.categoriesRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then(m => m.productsRoutes),
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.routes').then(m => m.usersRoutes),
  },
];
