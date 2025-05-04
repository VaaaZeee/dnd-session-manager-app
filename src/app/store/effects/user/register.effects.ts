import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startRegisterUserAction, userRegistrationFailAction, userRegistrationSuccessAction } from '@store/actions/user.actions';
import { isDefined } from '@utils/is-defined.utils';
import { catchError, filter, map, of, switchMap } from 'rxjs';

@Injectable()
export class RegisterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startRegisterUserAction),
      switchMap(({ email, password, userName }) => this.authService.registerUser(email, password, userName)),
      filter(isDefined),
      map(user => userRegistrationSuccessAction({ user })),
      catchError(() => of(userRegistrationFailAction()))
    );
  });
}
