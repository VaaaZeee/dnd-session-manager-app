import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { PAGES } from 'src/app/app-route-enums';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuthenticated()
    .pipe(
      tap(
        (isAuthenticated) =>
          !isAuthenticated && router.navigateByUrl(`/${PAGES.LOGIN}`)
      )
    );
};

export const loggedOutGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  return inject(AuthService)
    .isAuthenticated()
    .pipe(
      tap(
        (isAuthenticated) =>
          isAuthenticated && router.navigateByUrl(`/${PAGES.HOME}`)
      ),
      map((isAuthenticated) => !isAuthenticated)
    );
};
