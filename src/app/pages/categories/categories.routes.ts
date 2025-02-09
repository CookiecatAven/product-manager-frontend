import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./categories-create/categories-create.component')
      .then(m => m.CategoriesCreateComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: ':id',
    loadComponent: () => import('./category-details/category-details.component')
      .then(m => m.CategoryDetailsComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./categories-edit/categories-edit.component')
      .then(m => m.CategoriesEditComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
];
