import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  startRegisterUserAction,
  userRegistrationFailAction,
  userRegistrationSuccessAction,
} from '@store/actions/user.actions';
import { isStrictDefined } from '@utils/is-strict-defined.utils';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class RegisterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startRegisterUserAction),
      switchMap(({ email, password, userName }) =>
        this.authService.registerUser(email, password, userName)
      ),
      filter(isStrictDefined),
      map((user) => userRegistrationSuccessAction({ user })),
      catchError(() => of(userRegistrationFailAction()))
    );
  });
}
