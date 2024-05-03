import { ActionReducerMap } from '@ngrx/store';
import { GameState } from '../pages/main-page/components/game/store';
import { InitializerEffects } from './effects/initializer.effects';
import { RedirectEffects } from './effects/redirect.effects';
import { LoginEffects } from './effects/user/login.effects';
import { RegisterEffects } from './effects/user/register.effects';
import { userReducer } from './reducers/user.reducer';
import { UserState } from './states/user-state';

export interface AppState {
  user: UserState;
  game?: GameState;
}

export const reducers: ActionReducerMap<AppState> = { user: userReducer };

export const appEffects = [
  InitializerEffects,
  RedirectEffects,
  RegisterEffects,
  LoginEffects,
];
