import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ],
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productIdString: string = '';
  product: ProductDetailDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private productControllerService: ProductControllerService,
    private router: Router,
    protected authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.productIdString = this.route.snapshot.paramMap.get('id') || '';
    const id = this.productIdString ? Number.parseInt(this.productIdString) : null;
    if (id) {
      this.productControllerService.getProductById(id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  updateProduct(): void {
    // wenn wir kein Produkt haben, können wir nichts bearbeiten
    if (!this.product) {
      return
    }

    if (this.product) {
      this.router.navigateByUrl(`/products/edit/${this.product.id}`); // Weiterleitung zur Modify-Seite
    }
  }

  deleteProduct() {
    // wenn wir kein Produkt haben, können wir nichts löschen
    if (!this.product) {
      return
    }

    if (confirm('Willst du dieses Produkt wirklich löschen?')) {
      this.productControllerService.deleteProductById(this.product.id).subscribe(() => {
        alert('Produkt gelöscht!');
        this.router.navigate(['/products']);
      });
    }
  }
}
