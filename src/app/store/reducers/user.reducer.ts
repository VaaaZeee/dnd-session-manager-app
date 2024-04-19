import { createReducer, on } from '@ngrx/store';
import { userRegistrationSuccessAction } from '../actions/user.actions';
import { UserState } from '../states/user-state';
const initialState: UserState = {};

export const userReducer = createReducer<UserState>(
  initialState,
  on(
    userRegistrationSuccessAction,
    (state, user): UserState => ({ ...state, ...user })
  )
);
