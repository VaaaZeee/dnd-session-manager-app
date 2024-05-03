import { createSelector } from '@ngrx/store';
import { RIGHT_TOOLBAR_ACTIONS } from '../../components/right-toolbar/right-toolbar-actions.const';
import { RightToolbarTools } from '../../components/right-toolbar/right-toolbar-tools.enum';
import { selectGame } from './game-selector';

const selectRightToolbarState = createSelector(
  selectGame,
  (state) => state.rightToolbar
);

export const selectRightToolbarSelectedTool = createSelector(
  selectRightToolbarState,
  (state) => state.selectedTool
);

export const selectIsGrabSelected = createSelector(
  selectRightToolbarState,
  (state) => state.selectedTool === RightToolbarTools.GRAB
);

export const selectIsFogSelected = createSelector(
  selectRightToolbarState,
  (state) => state.selectedTool === RightToolbarTools.FOG
);

export const selectRightToolbarTools = createSelector(
  selectRightToolbarSelectedTool,
  (selectedTool) =>
    RIGHT_TOOLBAR_ACTIONS.map((toolbarAction) => ({
      ...toolbarAction,
      isSelected: selectedTool === toolbarAction.id,
    }))
);
