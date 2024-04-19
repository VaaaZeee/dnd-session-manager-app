import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedOutGuard } from '@core/guards/auth-guards';
import { PAGES } from './app-route-enums';

const routes: Routes = [
  {
    path: PAGES.HOME,
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
    /* canActivateChild: [authGuard], */
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
    redirectTo: PAGES.HOME,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
