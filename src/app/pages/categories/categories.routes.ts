import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./categories.component').then(m => m.CategoriesComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./category-create/category-create.component')
      .then(m => m.CategoryCreateComponent),
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
    loadComponent: () => import('./category-edit/category-edit.component')
      .then(m => m.CategoryEditComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
];
