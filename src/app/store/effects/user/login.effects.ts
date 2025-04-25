import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  logoutUserAction,
  startLoginUserAction,
  startUserAutoLoginAction,
  userAutoLoginFailAction,
  userAutoLoginSuccessAction,
  userLoginFailAction,
  userLoginSuccessAction,
} from '@store/actions/user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class LoginEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startLoginUserAction),
      switchMap(({ email, password }) => this.authService.loginWithEmailAndPassword(email, password)),
      map(user => userLoginSuccessAction({ user })),
      catchError(error => {
        console.log(error);
        return of(userLoginFailAction());
      })
    );
  });

  autoLoginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startUserAutoLoginAction),
      switchMap(({ email, password }) => this.authService.loginWithEmailAndPassword(email, password)),
      map(user => userAutoLoginSuccessAction({ user })),
      catchError(() => of(userAutoLoginFailAction()))
    );
  });

  logoutUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutUserAction),
        switchMap(() => this.authService.logout())
      );
    },
    { dispatch: false }
  );
}
