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

export const startLoginUserAction = createAction(
  '[Login] Start login user action',
  props<{ email: string; password: string }>()
);

export const userLoginSuccessAction = createAction(
  '[Login] User login success action',
  props<{ user: UserData }>()
);

export const userLoginFailAction = createAction(
  '[Login] User login fail action'
);
