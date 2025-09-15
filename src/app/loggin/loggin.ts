import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseResponse, LogginResponse, LogginService, User } from './loggin.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-loggin',
  imports: [ReactiveFormsModule],
  templateUrl: './loggin.html',
  styleUrl: './loggin.css',
})
export class Loggin {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly logginService = inject(LogginService);

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

    this.logginService
      .loggin({ username: username || null, password: password || null })
      .subscribe({
        next: (response: LogginResponse) => {
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

    this.logginService.refreshToken().subscribe({
      next: (refreshResponse: LogginResponse) => {
        console.log('Token refreshed successfully', refreshResponse);
        localStorage.setItem('session', refreshResponse?.access_token ?? 'no token');
      },
      error: () => {
        console.error('Error refreshing token');
      },
    });
  }
}
