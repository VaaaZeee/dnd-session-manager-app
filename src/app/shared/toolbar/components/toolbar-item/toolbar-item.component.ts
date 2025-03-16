import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { Nullable } from '@models/nullable';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { addIcons } from 'ionicons';
import { RightToolbarTools } from 'src/app/pages/main-page/components/game/components/right-toolbar/right-toolbar-tools.enum';

@Component({
  selector: 'dnd-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.scss'],
  imports: [NgIf, NgClass, IonIcon],
})
export class ToolbarItemComponent {
  @Input() public toolbarAction: Nullable<ToolbarAction>;
  @Input() public isSelected: Nullable<boolean>;
  @Output() public selectToolbarAction = new EventEmitter<RightToolbarTools>();

  constructor(private readonly store: Store) {
    addIcons({});
  }

  protected dispatchToolbarAction(): void {
    if (this.toolbarAction?.action) {
      this.store.dispatch(this.toolbarAction.action);
    }
  }
}
