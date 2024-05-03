import { createSelector } from '@ngrx/store';
import { TOP_TOOLBAR_ACTIONS } from '../../components/top-toolbar/top-toolbar-actions.const';
import { TopToolbarTools } from '../../components/top-toolbar/top-toolbar-tools.enum';
import { selectGame } from './game-selector';
import {
  selectIsFogSelected,
  selectIsGrabSelected,
} from './right-toolbar.selector';

const selectTopToolbarState = createSelector(
  selectGame,
  (state) => state.topToolbar
);

export const selectTopToolbarSelectedTool = createSelector(
  selectTopToolbarState,
  (state) => state.selectedTool
);

export const selectIsMoveSelected = createSelector(
  selectIsGrabSelected,
  selectTopToolbarSelectedTool,
  (isGrabSelected, selectedTool) =>
    selectedTool === TopToolbarTools.MOVE && !isGrabSelected
);

export const selectTopToolbarTools = createSelector(
  selectIsFogSelected,
  selectTopToolbarSelectedTool,
  (isFogSelected, selectedTool) =>
    isFogSelected
      ? TOP_TOOLBAR_ACTIONS.map((toolbarAction) => ({
          ...toolbarAction,
          isSelected: selectedTool === toolbarAction.id,
        }))
      : []
);
