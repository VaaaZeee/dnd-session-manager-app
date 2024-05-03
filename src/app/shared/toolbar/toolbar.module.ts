import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToolbarItemComponent } from './components/toolbar-item/toolbar-item.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ToolbarComponent, ToolbarItemComponent],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
