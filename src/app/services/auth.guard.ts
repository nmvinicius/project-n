import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = () => {
  return inject(AuthService).user$ ? true : inject(Router).navigateByUrl('/login');
};