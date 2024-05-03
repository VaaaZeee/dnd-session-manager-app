import { createAction } from '@ngrx/store';

const PREFIX = '[Top Toolbar] ';

export const startMoveAction = createAction(PREFIX + 'Start move action');

export const startDrawPolygonAction = createAction(
  PREFIX + 'Start draw polygon action'
);

export const startDrawRectangleAction = createAction(
  PREFIX + 'Start draw rectangle action'
);
