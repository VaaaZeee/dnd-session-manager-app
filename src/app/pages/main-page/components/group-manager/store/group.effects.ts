import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '@store/selectors/user.selectors';
import { isDefined } from '@utils/is-strict-defined.utils';
import { filter, map, switchMap, tap } from 'rxjs';
import { GroupManagerService } from 'src/app/pages/main-page/components/group-manager/services/group-manager.service';
import { fetchingGroupsSuccessAction, startFetchingGroupsAction } from 'src/app/pages/main-page/components/group-manager/store/group.actions';
import { openCreateGroupDialogAction } from './group.actions';

@Injectable()
export class GroupEffects implements OnInitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly groupManagerService: GroupManagerService
  ) {}

  ngrxOnInitEffects() {
    return startFetchingGroupsAction();
  }

  fetchGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startFetchingGroupsAction),
      concatLatestFrom(() => this.store.select(selectCurrentUser)),
      map(([_, user]) => user),
      filter(isDefined),
      switchMap(user => this.groupManagerService.getGroups(user)),
      map(groups => fetchingGroupsSuccessAction({ groups }))
    );
  });

  createGroup$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(openCreateGroupDialogAction),
        concatLatestFrom(() => this.store.select(selectCurrentUser)),
        map(([_, user]) => user),
        filter(isDefined),
        switchMap(user => this.groupManagerService.openCreateGroupDialog()),
        tap(console.log)
      );
    },
    { dispatch: false }
  );
}
