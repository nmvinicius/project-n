import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithRedirect, User, getRedirectResult, onAuthStateChanged, getIdTokenResult } from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    setPersistence(this.auth, browserLocalPersistence);
    this.initializeAuthStateListener();
  }

  private initializeAuthStateListener() {
    onAuthStateChanged(
      this.auth, 
      user => {
        this.currentUser = user;
        if (user) {
          this.router.navigateByUrl('/');
        }
      },
      error => console.error(error)
    );
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
    
  async googleSignIn() {
    try {
      await signInWithRedirect(this.auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }
  
  signOut() {
    this.auth.signOut();
    this.currentUser = null;
    this.router.navigateByUrl('/login');
  }

  async isSignedIn() {
    try {
      if (!this.currentUser) return false;
      const expiryDate = new Date((await getIdTokenResult(this.currentUser)).expirationTime);
      if (expiryDate < new Date()) return false;
      return true;
    } catch (error) {
      console.error('Error checking if user is signed in:', error);
      return false;
    }
  }
}
