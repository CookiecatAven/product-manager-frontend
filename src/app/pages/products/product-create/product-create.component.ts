import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { ProductControllerService, CategoryControllerService } from '../../../openapi-client';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
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

  onSubmit() {
    if (this.productForm.invalid) return;

    this.loading = true;
    const productData = this.productForm.value;

    this.productController.createProduct(productData).subscribe({
      next: () => {
        this.router.navigate(['/products']).then(() => {
          // Optional: Toast Message für erfolgreiche Erstellung
        });
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.loading = false;
      }
    });
  }
}
