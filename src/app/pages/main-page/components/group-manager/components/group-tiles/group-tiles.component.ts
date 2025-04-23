import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '@models/group';
import { Nullable } from '@models/nullable';
import { addIcons } from 'ionicons';
import { peopleOutline } from 'ionicons/icons';
import { GroupTileComponent } from './components/group-tile/group-tile.component';
import { NoGroupsComponent } from './components/no-groups/no-groups.component';

@Component({
  selector: 'dnd-group-tiles',
  templateUrl: './group-tiles.component.html',
  styleUrls: ['./group-tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupTileComponent, NoGroupsComponent],
})
export class GroupTilesComponent {
  @Input({ required: true }) public groups: Nullable<Group[]>;

  constructor() {
    addIcons({ peopleOutline });
  }
}
