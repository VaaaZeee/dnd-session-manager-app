import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { Observable } from 'rxjs';
import { selectTopToolbarTools } from '../../store/selectors/top-toolbar.selector';
import { NgIf, AsyncPipe } from '@angular/common';
import { ToolbarComponent } from '../../../../../../shared/toolbar/toolbar.component';

@Component({
    selector: 'dnd-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss'],
    imports: [NgIf, ToolbarComponent, AsyncPipe]
})
export class ToolbarTopComponent {
  protected toolbarActions$: Observable<ToolbarAction[]> = this.store.select(
    selectTopToolbarTools
  );

  constructor(private readonly store: Store) {}
}
