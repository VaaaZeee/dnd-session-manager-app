import { ActionReducerMap } from '@ngrx/store';
import { RegisterEffects } from './effects/user/register.effects';
import { userReducer } from './reducers/user.reducer';
import { UserState } from './states/user-state';

export interface AppState {
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = { user: userReducer };

export const appEffects = [RegisterEffects];