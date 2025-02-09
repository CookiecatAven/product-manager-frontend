import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryControllerService, ProductControllerService, ProductDetailDto } from '../../../openapi-client';

@Component({
  selector: 'pm-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  productIdString: string = '';
  product: ProductDetailDto | null = null;
  productForm: FormGroup;
  categories: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productController: ProductControllerService,
    private categoryController: CategoryControllerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      sku: ['', Validators.required],
      active: [true],
      name: ['', Validators.required],
      image: [''],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.productIdString = this.route.snapshot.paramMap.get('id') || '';
    const id = this.productIdString ? Number.parseInt(this.productIdString) : null;
    if (id) {
      this.productController.getProductById(id).subscribe((data) => {
        this.product = data;
        this.productForm.patchValue({
          sku: data.sku,
          active: data.active,
          name: data.name,
          image: data.image,
          description: data.description,
          price: data.price,
          stock: data.stock,
          categoryId: data.category?.id
        })
      });
    }
  }

  private loadCategories() {
    this.categoryController.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  protected onSubmit() {
    // Nicht fortfahren, wenn wir kein Produkt haben, oder das Formular ungültig ist
    if (!this.product || this.productForm.invalid) return;

    this.loading = true;
    const productData = this.productForm.value;
    const productId = this.product.id;

    this.productController.updateProductById(productId, productData).subscribe({
      next: () => {
        this.router.navigate([`/products/${productId}`])
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.loading = false;
      }
    });
  }
}
