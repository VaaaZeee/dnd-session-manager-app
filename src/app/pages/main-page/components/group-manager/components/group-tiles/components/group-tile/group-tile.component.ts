import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { Group } from '@models/group';
import { Nullable } from '@models/nullable';
import { addIcons } from 'ionicons';
import {
  americanFootballOutline,
  barbellOutline,
  baseballOutline,
  basketballOutline,
  beerOutline,
  boatOutline,
  bonfireOutline,
  bookOutline,
  bugOutline,
  buildOutline,
  constructOutline,
  diamondOutline,
  earthOutline,
  fastFoodOutline,
  hourglassOutline,
  pawOutline,
  peopleOutline,
  pizzaOutline,
  planetOutline,
  skullOutline,
  trophyOutline,
} from 'ionicons/icons';

@Component({
  selector: 'dnd-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrls: ['./group-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonIcon],
})
export class GroupTileComponent {
  @Input({ required: true }) public group: Nullable<Group>;

  constructor() {
    addIcons({
      americanFootballOutline,
      barbellOutline,
      baseballOutline,
      basketballOutline,
      boatOutline,
      bonfireOutline,
      bookOutline,
      bugOutline,
      beerOutline,
      buildOutline,
      constructOutline,
      diamondOutline,
      earthOutline,
      fastFoodOutline,
      hourglassOutline,
      pawOutline,
      peopleOutline,
      pizzaOutline,
      planetOutline,
      skullOutline,
      trophyOutline,
    });
  }
}
