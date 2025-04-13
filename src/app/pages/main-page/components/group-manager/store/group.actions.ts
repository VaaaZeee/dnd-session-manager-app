import { Group } from '@models/group';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[Groups]';

export const startFetchingGroupsAction = createAction(
  `${PREFIX} Start fetching groups`
);

export const fetchingGroupsSuccesAction = createAction(
  `${PREFIX} Fetching groups success`,
  props<{ groups: Group[] }>()
);
