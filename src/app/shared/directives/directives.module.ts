import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeDirective],
  exports: [ResizeDirective],
})
export class DirectivesModule {}
