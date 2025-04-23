import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '@store/states/user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user
);
