import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { Nullable } from '@models/nullable';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

type IconTypes = 'add-outline';

@Component({
  selector: 'dnd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, IonButton],
})
export class ButtonComponent {
  @Input() icon: Nullable<IconTypes>;
  @Output() clicked = new EventEmitter();

  constructor() {
    addIcons({ addOutline });
  }
}
