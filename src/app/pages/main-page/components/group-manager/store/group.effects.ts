import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { currentUser } from '@store/selectors/user.selectors';
import { map, switchMap } from 'rxjs';
import { GroupManagerService } from 'src/app/pages/main-page/components/group-manager/services/group-manager.service';
import {
  fetchingGroupsSuccesAction,
  startFetchingGroupsAction,
} from 'src/app/pages/main-page/components/group-manager/store/group.actions';

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
      concatLatestFrom(() => this.store.select(currentUser)),
      switchMap(([_, user]) => this.groupManagerService.getGroups(user)),
      map((groups) => fetchingGroupsSuccesAction({ groups }))
    );
  });
}
