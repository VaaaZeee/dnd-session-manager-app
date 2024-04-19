import { UserData } from '@models/userData';
import { createAction, props } from '@ngrx/store';

export const startRegisterUserAction = createAction(
  '[Register] Start register user action',
  props<{ email: string; password: string; userName: string }>()
);

export const userRegistrationSuccessAction = createAction(
  '[Register] User registration success action',
  props<{ user: UserData }>()
);

export const userRegistrationFailAction = createAction(
  '[Register] User registration fail action'
);
