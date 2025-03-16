import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubblesOutline } from 'ionicons/icons';
import { PlayerData } from '../../models/player-data';
import { PlayerListItemComponent } from '../player-list-item/player-list-item.component';

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
  imports: [NgFor, IonIcon, PlayerListItemComponent],
})
export class PlayerListComponent {
  protected players = PLAYERS;

  constructor() {
    addIcons({ chatbubblesOutline });
  }
}
