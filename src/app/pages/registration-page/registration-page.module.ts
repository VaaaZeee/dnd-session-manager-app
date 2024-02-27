import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from '@shared/form-input/form-input.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    ReactiveFormsModule,
    FormInputModule,
    IonicModule,
  ],
  declarations: [RegistrationPageComponent],
})
export class RegistrationPageModule {}
