import { Action } from '@ngrx/store';
import { RightToolbarTools } from 'src/app/pages/main-page/components/game/components/right-toolbar/right-toolbar-tools.enum';
import { TopToolbarTools } from 'src/app/pages/main-page/components/game/components/top-toolbar/top-toolbar-tools.enum';

export interface ToolbarAction {
  id: RightToolbarTools | TopToolbarTools;
  icon: string;
  action: Action;
  isSelected?: boolean;
}
