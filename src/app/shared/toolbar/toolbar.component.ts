import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Nullable } from './../../models/nullable';
import { ToolbarItemComponent } from './components/toolbar-item/toolbar-item.component';
import { ToolbarAction } from './models/toolbar-action';

@Component({
  selector: 'dnd-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [NgIf, NgFor, ToolbarItemComponent],
})
export class ToolbarComponent {
  @Input() public actions: Nullable<ToolbarAction[]>;
  @Input() public orientation: 'row' | 'column' = 'row';
}
