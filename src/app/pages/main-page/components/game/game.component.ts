import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapEditorComponent } from './components/map-editor/map-editor.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { RightToolbarComponent } from './components/right-toolbar/right-toolbar.component';
import { ToolbarTopComponent } from './components/top-toolbar/top-toolbar.component';

@Component({
  selector: 'dnd-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PlayerListComponent,
    ToolbarTopComponent,
    MapEditorComponent,
    RightToolbarComponent,
  ],
})
export class GameComponent {}
