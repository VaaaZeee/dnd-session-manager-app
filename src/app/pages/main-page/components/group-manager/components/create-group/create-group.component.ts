import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dialog } from '@models/dialog';
import { DialogFrameComponent } from '@shared/dialog-frame/dialog-frame.component';

@Component({
  selector: 'dnd-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DialogFrameComponent],
})
export class CreateGroupComponent extends Dialog {}
