import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '@shared/form-input/form-input.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    FormInputModule,
  ],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {}
