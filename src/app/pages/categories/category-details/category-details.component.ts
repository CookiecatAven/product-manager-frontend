import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { CategoryControllerService, CategoryDetailDto } from '../../../openapi-client';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'pm-categories-details',
  imports: [
    MatButton,
    MatCard,
    MatCardTitle,
    NgIf,
    RouterLink,
    MatIcon,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatGridList,
    MatGridTile,
    NgForOf
  ],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent {
  productIdString: string = '';
  category: CategoryDetailDto | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private categoryController: CategoryControllerService,
    private router: Router,
    protected authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.productIdString = this.route.snapshot.paramMap.get('id') || '';
    const id = this.productIdString ? Number.parseInt(this.productIdString) : null;
    if (id) {
      this.categoryController.getCategoryById(id).subscribe({
        next: (data) => {
          this.category = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Fehler bei Laden von Kategorie', error);
          this.isLoading = false;
        }
      });
    }
  }

  deleteCategory() {
    // wenn wir keine Kategorie haben, können wir nichts löschen
    if (!this.category) {
      return
    }

    if (confirm('Willst du diese Kategorie wirklich löschen?')) {
      this.categoryController.deleteCategoryById(this.category.id).subscribe(() => {
        alert('Kategorie gelöscht!');
        this.router.navigate(['/categories']);
      });
    }
  }
}
