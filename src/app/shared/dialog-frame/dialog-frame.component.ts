import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'dnd-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss'],
  imports: [IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFrameComponent {
  @Input({ required: true }) public title: string = '';
  @HostBinding('class.confirm-dialog') public isConfirmDialog: boolean = false;

  @Output() public cancelClicked = new EventEmitter();
  @Output() public confirmClicked = new EventEmitter();

  constructor() {
    addIcons({ closeOutline });
  }
}
