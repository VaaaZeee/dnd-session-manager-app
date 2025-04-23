import { inject, Injectable } from '@angular/core';
import { Group } from '@models/group';
import { Store } from '@ngrx/store';
import { isDefined } from '@utils/is-strict-defined.utils';
import { filter, Observable } from 'rxjs';
import { selectGroups } from '../store/group.selectors';
import { GroupManagerService } from './group-manager.service';

@Injectable({
  providedIn: 'root',
})
export class GroupManagerFacade {
  private readonly groupManagerService = inject(GroupManagerService);
  private readonly store = inject(Store);

  public readonly groups$: Observable<Group[]> = this.store
    .select(selectGroups)
    .pipe(filter(isDefined));
}
