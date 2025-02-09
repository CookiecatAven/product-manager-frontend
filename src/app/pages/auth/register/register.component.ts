import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserControllerService } from '../../../openapi-client';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private userService = inject(UserControllerService);
  private router = inject(Router);
  loading: boolean = false;
  errorMessage: string | null = null;

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    street: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    zip: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
    city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
    country: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
    phone: new FormControl('', [Validators.maxLength(15)]),
    mobilePhone: new FormControl('', [Validators.maxLength(15)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$')
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: RegisterComponent.checkPasswords });

  static checkPasswords(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordsMismatch: true }
      : null;
  }

  submitForm() {
    this.errorMessage = null;
    if (this.registerForm.invalid) return;

    this.loading = true;
    const formData = this.registerForm.value;

    this.userService.registerWithoutAdminRights({
      firstName: formData.firstName!,
      lastName: formData.lastName!,
      street: formData.street!,
      zip: formData.zip!,
      city: formData.city!,
      country: formData.country!,
      phone: formData.phone!,
      mobilePhone: formData.mobilePhone!,
      email: formData.email!,
      password: formData.password!
    }).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err: { error: { message: string; }; }) => {
        this.errorMessage = err.error?.message || 'Registrierung fehlgeschlagen. Versuchen Sie es erneut.';
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}
