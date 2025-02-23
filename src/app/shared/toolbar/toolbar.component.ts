import { Component, Input } from '@angular/core';
import { Nullable } from './../../models/nullable';
import { ToolbarAction } from './models/toolbar-action';

@Component({
    selector: 'dnd-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: false
})
export class ToolbarComponent {
  @Input() public actions: Nullable<ToolbarAction[]>;
  @Input() public orientation: 'row' | 'column' = 'row';
}
