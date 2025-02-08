import { Component, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { NgForOf, NgIf } from '@angular/common';
import { ProductControllerService, ProductShowDto } from '../../openapi-client';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { RouterLink, RouterModule } from '@angular/router';

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
    RouterModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: ProductShowDto[] = [];
  error: string | null = null;
  loading = true;

  constructor(private productsController: ProductControllerService) {
  }

  ngOnInit(): void {
    this.loadProducts();
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
