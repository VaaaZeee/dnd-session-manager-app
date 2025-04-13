import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { addIcons } from 'ionicons';
import { analyticsOutline, moveOutline, squareOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { ToolbarComponent } from '../../../../../../shared/toolbar/toolbar.component';
import { selectTopToolbarTools } from '../../store/selectors/top-toolbar.selector';

@Component({
  selector: 'dnd-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss'],
  imports: [ToolbarComponent, AsyncPipe],
})
export class ToolbarTopComponent {
  protected toolbarActions$: Observable<ToolbarAction[]> = this.store.select(
    selectTopToolbarTools
  );

  constructor(private readonly store: Store) {
    addIcons({ moveOutline, analyticsOutline, squareOutline });
  }
}
