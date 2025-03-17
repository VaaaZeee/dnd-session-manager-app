import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { Nullable } from '@models/nullable';

@Component({
  selector: 'dnd-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon, RouterLink],
})
export class TileComponent {
  @Input({ required: true }) public name: Nullable<string>;
  @Input() public icon: Nullable<string>;
  @Input() public link: Nullable<string>;

  @Output() public tileClicked = new EventEmitter<void>();
}
