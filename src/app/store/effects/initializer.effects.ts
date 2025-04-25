import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { releaseAppInitializerAction, startAppInitializerAction } from '@store/actions/initializer.actions';
import { userAutoLoginFailAction, userAutoLoginSuccessAction } from '@store/actions/user.actions';
import { map, switchMap, tap } from 'rxjs';

@Injectable()
export class InitializerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService
  ) {}

  devAutoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(startAppInitializerAction),
        switchMap(() => this.authService.autoLogin()),
        tap(() => this.authService.devAutoLogin())
      );
    },
    { dispatch: false }
  );

  releaseAppInitializer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userAutoLoginFailAction, userAutoLoginSuccessAction),
      map(() => releaseAppInitializerAction())
    );
  });
}
