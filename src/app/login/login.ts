import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginResponse, LoginService } from './login.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly loginService = inject(LoginService);

  public loginForm = this.formBuilder.group({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  private refreshTokenInterval$: Subscription | null = null;

  public onFormSubmit(): void {
    if (!this.loginForm.valid) {
      console.error('Form is invalid');

      return;
    }

    const { username, password } = this.loginForm.value;

    this.loginService.login({ username: username || null, password: password || null }).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful', response);
        localStorage.setItem('session', response?.access_token ?? 'no token');

        this.refreshTokenInterval$ = interval(response.expires_in * 1000).subscribe(() =>
          this.refreshTokenAuth()
        );

        this.router.navigate(['/home']);
      },
      error: () => {
        console.error('Error al iniciar sesión');
      },
    });
  }

  private refreshTokenAuth(): void {
    console.log('Refreshing token... subscription active');

    this.loginService.refreshToken().subscribe({
      next: (refreshResponse: LoginResponse) => {
        console.log('Token refreshed successfully', refreshResponse);
        localStorage.setItem('session', refreshResponse?.access_token ?? 'no token');
      },
      error: () => {
        console.error('Error refreshing token');
      },
    });
  }
}
