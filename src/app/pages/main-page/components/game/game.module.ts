import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MapEditorComponent } from './components/map-editor/map-editor.component';
import { PlayerListItemComponent } from './components/player-list-item/player-list-item.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  imports: [CommonModule, GameRoutingModule, IonicModule],
  declarations: [
    GameComponent,
    PlayerListComponent,
    PlayerListItemComponent,
    MapEditorComponent,
  ],
})
export class GameModule {}
