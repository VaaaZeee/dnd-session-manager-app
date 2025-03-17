import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dnd-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupManagerComponent {}
