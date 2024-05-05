import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {
  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  player() {
    this.router.navigateByUrl('/player');
  }

  maker() {
    this.router.navigateByUrl('/maker');
  }

  logout() {
    this.authService.signOut();
  }
}
