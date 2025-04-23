import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dnd-no-groups',
  templateUrl: './no-groups.component.html',
  styleUrls: ['./no-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoGroupsComponent {}
