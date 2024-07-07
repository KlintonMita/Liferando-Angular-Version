import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { getAuth, signOut } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, NgIf, CommonModule],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.scss'
})
export class SignOutComponent {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  router = inject(Router);

  constructor(public dialogRef: MatDialogRef<SignOutComponent>) {
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
     console.log(aUser);
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.dialogRef.close();
      this.loginPage();
    }).catch((error) => {
      // An error happened.
    });    
  }

  loginPage() {
    this.router.navigate(['']);
  }
  
}
