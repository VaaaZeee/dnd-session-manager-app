import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration-page/registration-page.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'registration',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
