import { ToolbarAction } from '@shared/toolbar/models/toolbar-action';
import {
  startDrawPolygonAction,
  startDrawRectangleAction,
  startMoveAction,
} from '../../store/actions/top-toolbar.actions';
import { TopToolbarTools } from './top-toolbar-tools.enum';

export const TOP_TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    id: TopToolbarTools.MOVE,
    icon: 'move-outline',
    action: startMoveAction(),
  },
  {
    id: TopToolbarTools.DRAW_POLYGON,
    icon: 'analytics-outline',
    action: startDrawPolygonAction(),
  },
  {
    id: TopToolbarTools.DRAW_RECTANGLE,
    icon: 'square-outline',
    action: startDrawRectangleAction(),
  },
];
