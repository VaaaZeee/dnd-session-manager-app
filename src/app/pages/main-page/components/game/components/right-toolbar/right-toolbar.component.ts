import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { addIcons } from 'ionicons';
import { cloudOutline, handRightOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { ToolbarComponent } from '../../../../../../shared/toolbar/toolbar.component';
import { selectRightToolbarTools } from '../../store/selectors/right-toolbar.selector';

@Component({
  selector: 'dnd-right-toolbar',
  templateUrl: './right-toolbar.component.html',
  styleUrls: ['./right-toolbar.component.scss'],
  imports: [ToolbarComponent, AsyncPipe],
})
export class RightToolbarComponent {
  protected toolbarActions$: Observable<ToolbarAction[]> = this.store.select(
    selectRightToolbarTools
  );

  constructor(private readonly store: Store) {
    addIcons({ handRightOutline, cloudOutline });
  }
}
