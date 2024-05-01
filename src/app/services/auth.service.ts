import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, User } from '@angular/fire/auth';
import { user, signInWithRedirect, getRedirectResult } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = user(this.auth);
  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.handleRedirectResult();
  }

  private async handleRedirectResult() {
    try {
      const userCredential = await getRedirectResult(this.auth);
      if (userCredential) {
        this.currentUser = userCredential.user;
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/login');
      }
    } catch (error) {
      console.error('Error handling redirect result:', error);
      this.router.navigateByUrl('/login');
    }
  }

  async loginWithGoogle() {
    try {
      await signInWithRedirect(this.auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  get avatarUrl() {
    return this.currentUser?.photoURL;
  }
}
