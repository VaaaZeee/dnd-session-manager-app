import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ToolbarModule } from '@shared/toolbar/toolbar.module';
import { MapEditorComponent } from './components/map-editor/map-editor.component';
import { PlayerListItemComponent } from './components/player-list-item/player-list-item.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { RightToolbarComponent } from './components/right-toolbar/right-toolbar.component';
import { ToolbarTopComponent } from './components/top-toolbar/top-toolbar.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { gameReducers } from './store';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    IonicModule,
    ToolbarModule,
    DirectivesModule,
    StoreModule.forFeature('game', gameReducers),
  ],
  declarations: [
    GameComponent,
    PlayerListComponent,
    PlayerListItemComponent,
    MapEditorComponent,
    RightToolbarComponent,
    ToolbarTopComponent,
  ],
})
export class GameModule {}
