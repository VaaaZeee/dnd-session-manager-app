import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PAGES } from 'src/app/app-route-enums';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();
  if (!isAuthenticated) {
    router.navigateByUrl(`/${PAGES.LOGIN}`);
  }
  return isAuthenticated;
};

export const loggedOutGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();
  if (isAuthenticated) {
    router.navigateByUrl(`/${PAGES.MAIN}`);
  }
  return !isAuthenticated;
};
