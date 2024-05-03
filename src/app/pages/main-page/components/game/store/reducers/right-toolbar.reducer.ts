import { createReducer, on } from '@ngrx/store';
import { RightToolbarState } from '..';
import { RightToolbarTools } from '../../components/right-toolbar/right-toolbar-tools.enum';
import {
  startFogAction,
  startGrabAction,
} from '../actions/right-toolbar.actions';
const initialState = { selectedTool: RightToolbarTools.GRAB };

export const rightToolbarReducer = createReducer<RightToolbarState>(
  initialState,
  on(
    startGrabAction,
    (state): RightToolbarState => ({
      ...state,
      selectedTool: RightToolbarTools.GRAB,
    })
  ),
  on(
    startFogAction,
    (state): RightToolbarState => ({
      ...state,
      selectedTool: RightToolbarTools.FOG,
    })
  )
);
