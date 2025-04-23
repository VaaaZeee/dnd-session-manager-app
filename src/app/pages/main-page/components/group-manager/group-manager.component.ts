import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@shared/button/button.component';
import { SearchBarComponent } from '@shared/search-bar/search-bar.component';
import { ComparatorUtils } from '@utils/comparator.utils';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { GroupTilesComponent } from './components/group-tiles/group-tiles.component';
import { GroupManagerFacade } from './services/group-manager.facade';

@Component({
  selector: 'dnd-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GroupTilesComponent, AsyncPipe, ButtonComponent, SearchBarComponent],
})
export class GroupManagerComponent {
  private readonly groupManagerFacade = inject(GroupManagerFacade);

  protected readonly searchTerm$ = new BehaviorSubject<string>('');
  protected readonly groups$ = combineLatest([this.groupManagerFacade.groups$, this.searchTerm$]).pipe(
    map(([groups, searchTerm]) => (searchTerm ? groups.filter(({ name }) => ComparatorUtils.containsString(name, searchTerm)) : groups))
  );

  protected searchTermChanged(searchTerm: string): void {
    this.searchTerm$.next(searchTerm);
  }
}
