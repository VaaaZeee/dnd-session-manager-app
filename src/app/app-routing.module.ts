import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, loggedOutGuard } from '@core/guards/auth-guards';
import { PAGES } from './app-route-enums';

const routes: Routes = [
  {
    path: PAGES.MAIN,
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
    canActivateChild: [authGuard],
  },
  {
    path: PAGES.LOGIN,
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
    canActivateChild: [loggedOutGuard],
  },
  {
    path: PAGES.REGISTRATION,
    loadChildren: () =>
      import('./pages/registration-page/registration-page.module').then(
        (m) => m.RegistrationPageModule
      ),
    canActivateChild: [loggedOutGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: PAGES.LOGIN,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
