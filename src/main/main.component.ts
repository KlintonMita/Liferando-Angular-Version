import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [[CommonModule, RouterOutlet,MatCardModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatDividerModule, MatIconModule, RouterLink],],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  authService = inject(AuthenticationService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;

  loginForm: FormGroup;

  errorMessage = '';
  passwordErrorMessage = '';

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    merge(
      this.loginForm.get('email')!.statusChanges,
      this.loginForm.get('email')!.valueChanges,
      this.loginForm.get('password')!.statusChanges,
      this.loginForm.get('password')!.valueChanges
    ).subscribe(() => this.updateErrorMessages());
    this.userSubscription = this.user$.pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return of(null);
      })
    ).subscribe((aUser: User | null) => {
      console.log(aUser);
    });
  }

  updateErrorMessages() {
    const email = this.loginForm.get('email');
    const password = this.loginForm.get('password');

    if (email?.hasError('required')) {
      this.errorMessage = 'Bitte E-Mail eingeben.';
    } else if (email?.hasError('email')) {
      this.errorMessage = 'Diese E-Mail-Adresse ist leider ungültig.';
    } else {
      this.errorMessage = '';
    }

    if (password?.hasError('required')) {
      this.passwordErrorMessage = 'Bitte Passwort eingeben';
    } else {
      this.passwordErrorMessage = '';
    }
  }

  
  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.loginEmailPassword(email, password).then(success => {
        if (success) {
          this.router.navigate(['/web']);
        } else {
          // Handle login failure
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    }
  }

  create() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.createAccount(email, password).then(success => {
        if (success) {
          this.router.navigate(['/web']);
        } else {
          // Handle account creation failure
          this.errorMessage = 'Account creation failed. Please try again.';
        }
      });
    }
  }
  async onGoogleSignIn() {

  }
}

