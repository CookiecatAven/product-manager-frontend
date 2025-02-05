import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
    ReactiveFormsModule
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

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const loginData = this.loginForm.value;

    this.http.post<{ token: string }>('https://294.cyrotech.ch/api/auth/login', loginData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Login erfolgreich!', response);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Login fehlgeschlagen.';
          this.loading = false;
        },
        complete: () => this.loading = false
      });
  }
}
