import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
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
import { BehaviorSubject } from 'rxjs';

const ICONS = [
  'people-outline',
  'american-football-outline',
  'barbell-outline',
  'baseball-outline',
  'basketball-outline',
  'boat-outline',
  'bonfire-outline',
  'book-outline',
  'bug-outline',
  'beer-outline',
  'build-outline',
  'construct-outline',
  'diamond-outline',
  'earth-outline',
  'fast-food-outline',
  'hourglass-outline',
  'paw-outline',
  'pizza-outline',
  'skull-outline',
  'trophy-outline',
];

@Component({
  selector: 'dnd-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, IonIcon],
})
export class IconSelectorComponent implements AfterViewInit {
  @Input() public set selectedIcon(icon: string) {
    this.currentSelectedIcon$.next(icon);
  }
  @Output() public selectedIconChanged = new EventEmitter<string>();

  protected icons = ICONS;
  protected defaultIcon = this.icons[0];
  protected currentSelectedIcon$ = new BehaviorSubject<string>(this.defaultIcon);

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

  public ngAfterViewInit(): void {
    this.selectedIconChanged.emit(this.defaultIcon);
  }

  protected selectIcon(icon: string): void {
    this.currentSelectedIcon$.next(icon);
    this.selectedIconChanged.emit(icon);
  }
}
