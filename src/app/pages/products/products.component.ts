import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ProductControllerService, ProductShowDto } from '../../openapi-client';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-products',
  imports: [
    MatGridList,
    MatGridTile,
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgIf,
    MatCardImage,
    RouterLink,
    RouterModule,
    MatButton,
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: ProductShowDto[] = [];
  error: string | null = null;
  loading = true;
  isAdmin$: Observable<boolean>;

  constructor(
    private productsController: ProductControllerService,
  private authService: AuthService,
  private router: Router
  ) {
  this.isAdmin$ = this.authService.isUserAdmin();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  createNewProduct() {
    this.router.navigate(['/products/create']);
  }

  private loadProducts(): void {
    this.productsController.getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load products. Please try again later.';
          this.loading = false;
          console.error('Error loading products:', error);
        }
      });
  }
}
