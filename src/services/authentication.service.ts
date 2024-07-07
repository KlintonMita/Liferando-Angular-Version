import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = inject(Auth);
  firestore = inject(Firestore);
  router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    privacyPolicy: new FormControl(false, [Validators.required]),
  });

  avatar: string = '';
  isSuccessMessageVisible = false;

  async loginEmailPassword(email: string, password: string): Promise<boolean> {
    try {
      const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(userCredentials.user);
      return true; // Login was successful
    } catch (error) {
      console.error('Error during sign-in:', error);
      return false; // Login failed
    }
  }

  async createAccount(email: string, password: string): Promise<boolean> {
    try {
      const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log(userCredentials.user);
      return true; // Account creation was successful
    } catch (error) {
      console.error('Error during account creation:', error);
      return false; // Account creation failed
    }
  }

  async logOut() {
    await signOut(this.auth);
  }
}
