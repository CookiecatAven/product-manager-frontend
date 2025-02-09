import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { CategoryControllerService, ProductControllerService } from '../../../openapi-client';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    RouterLink
  ],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productController: ProductControllerService,
    private categoryController: CategoryControllerService,
    private router: Router
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

  ngOnInit() {
    this.loadCategories();
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
    if (this.productForm.invalid) return;

    this.loading = true;
    const productData = this.productForm.value;

    this.productController.createProduct(productData).subscribe({
      next: () => {
        this.router.navigate(['/products'])
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.loading = false;
      }
    });
  }
}
