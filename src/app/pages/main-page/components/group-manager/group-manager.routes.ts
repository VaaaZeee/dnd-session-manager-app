import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { GroupManagerComponent } from './group-manager.component';
import { GroupEffects } from './store/group.effects';
import { groupsReducer } from './store/groups.reducer';

export const GROUP_MANAGER_ROUTES: Route[] = [
  {
    path: '',
    component: GroupManagerComponent,
    providers: [
      provideEffects([GroupEffects]),
      provideState('groups', groupsReducer),
    ],
  },
];
