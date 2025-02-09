import { Component, OnInit } from '@angular/core';
import { CategoryControllerService, CategoryShowDto } from '../../openapi-client';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pm-categories',
  imports: [
    MatCard,
    MatButton,
    MatIcon,
    NgIf,
    RouterLink,
    MatCardHeader,
    MatCardTitle,
    NgForOf
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryShowDto[] = [];
  loading = true;

  constructor(private categoriesController: CategoryControllerService, protected authService: AuthService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesController.getAllCategories().subscribe({
      next: categories => {
        this.categories = categories;
        this.loading = false;
      },
      error: error => {
        this.loading = false;
        console.error('Error loading categories:', error);
      }
    });
  }
}
