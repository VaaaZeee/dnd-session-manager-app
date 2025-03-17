import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TilesComponent } from './components/tiles/tiles.component';

@Component({
  selector: 'dnd-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TilesComponent],
})
export class LandingComponent {}
