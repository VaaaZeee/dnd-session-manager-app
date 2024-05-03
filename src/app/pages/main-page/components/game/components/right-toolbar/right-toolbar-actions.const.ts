import {
  startFogAction,
  startGrabAction,
} from '../../store/actions/right-toolbar.actions';
import { RightToolbarTools } from './right-toolbar-tools.enum';

export const RIGHT_TOOLBAR_ACTIONS = [
  {
    id: RightToolbarTools.GRAB,
    icon: 'hand-right-outline',
    action: startGrabAction(),
  },
  {
    id: RightToolbarTools.FOG,
    icon: 'cloud-outline',
    action: startFogAction(),
  },
];
