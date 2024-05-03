import { ActionReducerMap } from '@ngrx/store';
import { RightToolbarTools } from '../components/right-toolbar/right-toolbar-tools.enum';
import { TopToolbarTools } from '../components/top-toolbar/top-toolbar-tools.enum';
import { rightToolbarReducer } from './reducers/right-toolbar.reducer';
import { topToolbarReducer } from './reducers/top-toolbar.reducer';

export interface RightToolbarState {
  selectedTool: RightToolbarTools;
}

export interface TopToolbarState {
  selectedTool: TopToolbarTools;
}

export interface GameState {
  topToolbar: TopToolbarState;
  rightToolbar: RightToolbarState;
}

export const gameReducers: ActionReducerMap<GameState> = {
  topToolbar: topToolbarReducer,
  rightToolbar: rightToolbarReducer,
};
