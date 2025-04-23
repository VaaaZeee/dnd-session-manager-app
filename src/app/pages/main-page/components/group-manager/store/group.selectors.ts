import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from '.';

export const selectGroupsState = createFeatureSelector<GroupsState>('groups');
export const selectGroups = createSelector(
  selectGroupsState,
  ({ groups }) => groups
);
