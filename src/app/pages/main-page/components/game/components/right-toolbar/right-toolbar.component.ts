import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import { Observable } from 'rxjs';
import { selectRightToolbarTools } from '../../store/selectors/right-toolbar.selector';
import { NgIf, AsyncPipe } from '@angular/common';
import { ToolbarComponent } from '../../../../../../shared/toolbar/toolbar.component';

@Component({
    selector: 'dnd-right-toolbar',
    templateUrl: './right-toolbar.component.html',
    styleUrls: ['./right-toolbar.component.scss'],
    imports: [NgIf, ToolbarComponent, AsyncPipe]
})
export class RightToolbarComponent {
  protected toolbarActions$: Observable<ToolbarAction[]> = this.store.select(
    selectRightToolbarTools
  );

  constructor(private readonly store: Store) {}
}
