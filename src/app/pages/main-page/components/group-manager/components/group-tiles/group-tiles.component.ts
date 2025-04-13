import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Group } from '@models/group';
import { Nullable } from '@models/nullable';

@Component({
  selector: 'dnd-group-tiles',
  templateUrl: './group-tiles.component.html',
  styleUrls: ['./group-tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupTilesComponent {
  @Input({ required: true }) public groups: Nullable<Group[]>;
}
