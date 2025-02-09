import { Routes } from '@angular/router';

// @ts-ignore
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.authRoutes),
  },
  // {
  //   path: 'categories',
  //   loadChildren: () => import('./pages/categories/categories.routes').then(m => m.categoriesRoutes),
  // },
  // {
  //   path: 'general',
  //   loadChildren: () => import('./pages/general/general.routes').then(m => m.generalRoutes),
  // },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.routes').then(m => m.productsRoutes),
  },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./pages/users/users.routes').then(m => m.usersRoutes),
  // },
];
