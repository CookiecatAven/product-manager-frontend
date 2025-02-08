import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth.guard';

let ProductDetailsComponent;
export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./product-create/product-create.component')
      .then(m => m.ProductCreateComponent),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },

  {
    path: ':id',
    loadComponent: () => import('./product-details/product-details.component')
      .then(m => m.ProductDetailsComponent)
  }

];
