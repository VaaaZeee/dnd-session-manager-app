import { Route } from '@angular/router';
import { authGuard, loggedOutGuard } from '@core/guards/auth-guards';
import { PAGES } from './app-route-enums';

export const APP_ROUTES: Route[] = [
  {
    path: PAGES.MAIN,
    loadChildren: () =>
      import('./pages/main-page/main-page.routes').then(
        (m) => m.MAIN_PAGE_ROUTES
      ),
    canActivate: [authGuard],
  },
  {
    path: PAGES.LOGIN,
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent
      ),
    canActivate: [loggedOutGuard],
  },
  {
    path: PAGES.REGISTRATION,
    loadComponent: () =>
      import('./pages/registration-page/registration-page.component').then(
        (m) => m.RegistrationPageComponent
      ),
    canActivate: [loggedOutGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: PAGES.LOGIN,
  },
];
