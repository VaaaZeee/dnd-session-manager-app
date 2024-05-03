import { createReducer, on } from '@ngrx/store';
import { TopToolbarState } from '..';
import { TopToolbarTools } from '../../components/top-toolbar/top-toolbar-tools.enum';
import {
  startDrawPolygonAction,
  startDrawRectangleAction,
  startMoveAction,
} from '../actions/top-toolbar.actions';
const initialState = { selectedTool: TopToolbarTools.MOVE };

export const topToolbarReducer = createReducer<TopToolbarState>(
  initialState,
  on(
    startMoveAction,
    (state): TopToolbarState => ({
      ...state,
      selectedTool: TopToolbarTools.MOVE,
    })
  ),
  on(
    startDrawPolygonAction,
    (state): TopToolbarState => ({
      ...state,
      selectedTool: TopToolbarTools.DRAW_POLYGON,
    })
  ),
  on(
    startDrawRectangleAction,
    (state): TopToolbarState => ({
      ...state,
      selectedTool: TopToolbarTools.DRAW_RECTANGLE,
    })
  )
);
