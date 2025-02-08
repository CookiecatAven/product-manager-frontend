import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardActions } from '@angular/material/card';
import { UserControllerService } from '../../../openapi-client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
    ReactiveFormsModule,
    MatCardActions,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loading = false;
  errorMessage = '';

  constructor(private userController: UserControllerService) {
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

        localStorage.setItem('ACCESS_TOKEN', response.token);
        console.log('Login erfolgreich!', response);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login fehlgeschlagen.';
        this.loading = false;
      },
      complete: () => this.loading = false
    })
  }
}
