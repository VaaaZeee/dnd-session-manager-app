import { createAction } from '@ngrx/store';

export const startAppInitializerAction = createAction(
  '[App Initializer] Start app initializer'
);
export const releaseAppInitializerAction = createAction(
  '[App Initializer] Release app initializer'
);
