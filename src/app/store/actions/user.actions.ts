import { User } from '@models/user';
import { createAction, props } from '@ngrx/store';

export const startRegisterUserAction = createAction(
  '[Register] Start register user action',
  props<{ email: string; password: string; userName: string }>()
);

export const userRegistrationSuccessAction = createAction(
  '[Register] User registration success action',
  props<{ user: User }>()
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
  props<{ user: User }>()
);

export const userLoginFailAction = createAction(
  '[Login] User login fail action'
);

export const startUserAutoLoginAction = createAction(
  '[Auto login] Start user auto login action',
  props<{ email: string; password: string }>()
);

export const userAutoLoginSuccessAction = createAction(
  '[Auto login] User auto login success action',
  props<{ user: User }>()
);

export const userAutoLoginFailAction = createAction(
  '[Auto login] User auto login fail action'
);
export const logoutUserAction = createAction('[Nav bar] Log out user');
