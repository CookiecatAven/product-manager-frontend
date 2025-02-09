import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryControllerService, CategoryCreateDto } from '../../../openapi-client';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'pm-categories-create',
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
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {
  categoryForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryController: CategoryControllerService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      active: [true],
      name: ['', Validators.required]
    });
  }

  protected onSubmit() {
    if (this.categoryForm.invalid) return;

    this.loading = true;
    const categoryData: CategoryCreateDto = this.categoryForm.value;

    this.categoryController.createCategory(categoryData).subscribe({
      next: () => {
        this.router.navigate(['/categories'])
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.loading = false;
      }
    });
  }
}
