import { createReducer, on } from '@ngrx/store';
import { GroupsState } from '.';
import { fetchingGroupsSuccessAction } from './group.actions';

const initialState: GroupsState = {};

export const groupsReducer = createReducer<GroupsState>(
  initialState,
  on(fetchingGroupsSuccessAction, (state, { groups }) => ({
    ...state,
    groups,
  }))
);
