import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlayerData } from '../../models/player-data';

const PLAYERS: PlayerData[] = [
  { id: 'player1Id', name: 'Player 1' },
  { id: 'player2Id', name: 'Player 2' },
  { id: 'player3Id', name: 'Player 3' },
  { id: 'player4Id', name: 'Player 4' },
];

@Component({
  selector: 'dnd-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerListComponent {
  protected players = PLAYERS;
}
