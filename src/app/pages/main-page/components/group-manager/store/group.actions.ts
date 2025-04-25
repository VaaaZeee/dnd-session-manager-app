import { Group } from '@models/group';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[Groups]';

export const startFetchingGroupsAction = createAction(`${PREFIX} Start fetching groups`);

export const fetchingGroupsSuccessAction = createAction(`${PREFIX} Fetching groups success`, props<{ groups: Group[] }>());

export const openCreateGroupDialogAction = createAction(`${PREFIX} Open create group dialog`);
