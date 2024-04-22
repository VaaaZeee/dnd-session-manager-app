import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarModule } from 'src/app/layout/nav-bar/nav-bar.module';
import { HomePageRoutingModule as MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  imports: [CommonModule, MainPageRoutingModule, NavBarModule],
  declarations: [MainPageComponent],
})
export class MainPageModule {}
