import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductControllerService, ProductDetailDto } from '../../../openapi-client';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardModule,
  MatCardTitle
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { GoBackLinkComponent } from '../../elements/go-back-link/go-back-link.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgIf,
    CommonModule,
    MatCardModule,
    RouterLink,
    GoBackLinkComponent,
  ],
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productIdString: string = '';
  product: ProductDetailDto | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productController: ProductControllerService,
    private router: Router,
    protected authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.productIdString = this.route.snapshot.paramMap.get('id') || '';
    const id = this.productIdString ? Number.parseInt(this.productIdString) : null;
    if (id) {
      this.productController.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
        },
        error: (error: Error) => {
          console.error('Error loading product:', error);
          this.isLoading = false;
        }
      });
    }
  }

  deleteProduct() {
    // wenn wir kein Produkt haben, können wir nichts löschen
    if (!this.product) {
      return
    }

    if (confirm('Willst du dieses Produkt wirklich löschen?')) {
      this.productController.deleteProductById(this.product.id).subscribe(() => {
        alert('Produkt gelöscht!');
        this.router.navigate(['/products']);
      });
    }
  }
}
