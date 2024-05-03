import { createAction } from '@ngrx/store';

const PREFIX = '[Right Toolbar] ';

export const startGrabAction = createAction(PREFIX + 'Start grab action');
export const startFogAction = createAction(PREFIX + 'Start fog action');
