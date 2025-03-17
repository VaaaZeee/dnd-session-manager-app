import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

export const MAIN_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/landing/group-manager.routes').then(
            (m) => m.LANDING_ROUTES
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./components/group-manager/group-manager.routes').then(
            (m) => m.GROUP_MANAGER_ROUTES
          ),
      },
      {
        path: 'session',
        loadChildren: () =>
          import('./components/game/game.routes').then((m) => m.GAME_ROUTES),
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];
