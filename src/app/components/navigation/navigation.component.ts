import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(
    private authService: AuthService,
  ) {}


  logout() {
    this.authService.signOut();
  }

  isLoggedIn() {
    return this.authService.isSignedIn();
  }
}
