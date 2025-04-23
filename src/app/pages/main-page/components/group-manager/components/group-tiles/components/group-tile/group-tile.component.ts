import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { Group } from '@models/group';
import { Nullable } from '@models/nullable';

@Component({
  selector: 'dnd-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrls: ['./group-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon],
})
export class GroupTileComponent {
  @Input({ required: true }) public group: Nullable<Group>;
}
