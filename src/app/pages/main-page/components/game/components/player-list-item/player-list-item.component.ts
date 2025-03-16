import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatboxEllipsesOutline, trashOutline } from 'ionicons/icons';
import { Nullable } from '../../../../../../models/nullable';
import { PlayerData } from '../../models/player-data';

@Component({
  selector: 'dnd-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss'],
  imports: [NgIf, IonIcon],
})
export class PlayerListItemComponent {
  @Input() player: Nullable<PlayerData>;

  constructor() {
    addIcons({ chatboxEllipsesOutline, trashOutline });
  }
}
