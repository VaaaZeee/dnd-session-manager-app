import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { GameComponent } from './game.component';
import { gameReducers } from './store';

export const GAME_ROUTES: Route[] = [
  {
    path: '',
    providers: [provideState('game', gameReducers)],
    component: GameComponent,
  },
];
