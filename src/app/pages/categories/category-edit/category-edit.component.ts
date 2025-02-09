import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CategoryControllerService,
  CategoryCreateDto,
  CategoryDetailDto,
  ProductDetailDto
} from '../../../openapi-client';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'pm-categories-edit',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent implements OnInit {
  categoryIdString: string = '';
  category: CategoryDetailDto | null = null;
  categoryForm: FormGroup;
  categories: any[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryController: CategoryControllerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoryForm = this.fb.group({
      active: [true],
      name: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.categoryIdString = this.route.snapshot.paramMap.get('id') || '';
    const id = this.categoryIdString ? Number.parseInt(this.categoryIdString) : null;
    if (id) {
      this.categoryController.getCategoryById(id).subscribe((data) => {
        this.category = data;
        this.categoryForm.patchValue({
          active: data.active,
          name: data.name
        })
      });
    }
  }

  protected onSubmit() {
    // Nicht fortfahren, wenn wir keine Kategorie haben, oder das Formular ungültig ist
    if (!this.category || this.categoryForm.invalid) return;

    this.loading = true;
    const categoryData: CategoryCreateDto = this.categoryForm.value;
    const categoryId = this.category.id;

    this.categoryController.updateCategoryById(categoryId, categoryData).subscribe({
      next: () => {
        this.router.navigate(['/categories', categoryId])
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.loading = false;
      }
    });
  }
}
