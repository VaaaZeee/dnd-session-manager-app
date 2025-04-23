import { createReducer, on } from '@ngrx/store';
import {
  logoutUserAction,
  userAutoLoginSuccessAction,
  userLoginSuccessAction,
  userRegistrationSuccessAction,
} from '../actions/user.actions';
import { UserState } from '../states/user.state';
const initialState: UserState = {};

export const userReducer = createReducer<UserState>(
  initialState,
  on(
    userRegistrationSuccessAction,
    userLoginSuccessAction,
    userAutoLoginSuccessAction,
    (state, { user }): UserState => ({ ...state, user })
  ),
  on(logoutUserAction, (): UserState => initialState)
);
