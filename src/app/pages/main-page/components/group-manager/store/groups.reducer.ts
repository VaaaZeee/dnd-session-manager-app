import { createReducer, on } from '@ngrx/store';
import { GroupsState } from '.';
import { fetchingGroupsSuccesAction } from './group.actions';

const initialState: GroupsState = {};

export const groupsReducer = createReducer<GroupsState>(
  initialState,
  on(fetchingGroupsSuccesAction, (state, { groups }) => ({
    ...state,
    groups,
  }))
);
