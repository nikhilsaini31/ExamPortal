import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const normalGuard: CanActivateFn = (route, state) => {

  const loginservice = inject(LoginService);
    const router = inject(Router);
  
    if (loginservice.isLoggedIn() && loginservice.getUSerRole() === 'NORMAL') {
      return true;
    } else {
      // Navigate to the login page and return false
      router.navigate(['login']);
      return false;
    }
};
