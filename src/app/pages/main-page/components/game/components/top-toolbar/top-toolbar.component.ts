import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { Observable } from 'rxjs';
import { selectTopToolbarTools } from '../../store/selectors/top-toolbar.selector';

@Component({
    selector: 'dnd-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss'],
    standalone: false
})
export class ToolbarTopComponent {
  protected toolbarActions$: Observable<ToolbarAction[]> = this.store.select(
    selectTopToolbarTools
  );

  constructor(private readonly store: Store) {}
}
