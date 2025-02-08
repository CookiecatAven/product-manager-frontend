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
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';

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
    NgOptimizedImage
  ],
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetailDto | null = null;
  isAdmin = true; // Falls du eine Berechtigungsprüfung hast, ersetze dies durch eine echte Prüfung.

  constructor(
    private route: ActivatedRoute,
    private productControllerService: ProductControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const id = idString ? Number.parseInt(idString) : null;
    if (id) {
      this.productControllerService.getProductById(id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  updateProduct() {
    // wenn wir kein Produkt haben, können wir nichts updaten
    if (!this.product) {
      return;
    }

    this.productControllerService.updateProductById(this.product.id, this.product).subscribe(() => {
      alert('Produkt aktualisiert!');
    });
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
