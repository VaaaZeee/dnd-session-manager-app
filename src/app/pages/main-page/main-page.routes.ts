import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

export const MAIN_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'session',
        loadChildren: () =>
          import('./components/game/game.routes').then((m) => m.GAME_ROUTES),
      },
      { path: '', redirectTo: '/session', pathMatch: 'full' },
    ],
  },
];
