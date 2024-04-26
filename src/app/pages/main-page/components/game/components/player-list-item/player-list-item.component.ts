import { Component, Input } from '@angular/core';
import { Nullable } from '../../../../../../models/nullable';
import { PlayerData } from '../../models/player-data';

@Component({
  selector: 'dnd-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss'],
})
export class PlayerListItemComponent {
  @Input() player: Nullable<PlayerData>;
}
