import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserControllerService } from '../../../openapi-client';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[\W_]).{6,}$/)])
  });

  loading = false;
  errorMessage = '';

  constructor(
    private userController: UserControllerService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const loginData = this.loginForm.value as {
      email: string;
      password: string;
    };
    this.userController.login(loginData).subscribe({
      next: (response) => {
        if (!response.token) throw new Error('No token received from server');

        this.authService.login(response.token)
        console.log('Login erfolgreich!', response);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login fehlgeschlagen.';
        this.loading = false;
      },
      complete: () => this.loading = false
    })
  }
}
