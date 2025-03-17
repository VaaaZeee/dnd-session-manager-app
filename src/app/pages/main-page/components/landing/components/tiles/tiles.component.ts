import { ChangeDetectionStrategy, Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { gameControllerOutline, peopleOutline } from 'ionicons/icons';
import { TileComponent } from './components/tile/tile.component';

@Component({
  selector: 'dnd-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TileComponent],
})
export class TilesComponent {
  constructor() {
    addIcons({ peopleOutline, gameControllerOutline });
  }
}
