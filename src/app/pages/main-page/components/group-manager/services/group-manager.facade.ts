import { inject, Injectable } from '@angular/core';
import { Group } from '@models/group';
import { Store } from '@ngrx/store';
import { isDefined } from '@utils/is-defined.utils';
import { filter, Observable } from 'rxjs';
import { openCreateGroupDialogAction } from '../store/group.actions';
import { selectGroups } from '../store/group.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupManagerFacade {
  private readonly store = inject(Store);

  public readonly groups$: Observable<Group[]> = this.store.select(selectGroups).pipe(filter(isDefined));

  public openCreateGroup(): void {
    this.store.dispatch(openCreateGroupDialogAction());
  }
}
