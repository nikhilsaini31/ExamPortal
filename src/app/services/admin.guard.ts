import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';



export const adminGuard: CanActivateFn = (route, state) => {

  const loginservice = inject(LoginService);
  const router = inject(Router);

  if (loginservice.isLoggedIn() && loginservice.getUSerRole() === 'ADMIN') {
    return true;
  } else {
    // Navigate to the login page and return false
    router.navigate(['login']);
    return false;
  }
};
