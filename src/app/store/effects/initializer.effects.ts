import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  releaseAppInitializerAction,
  startAppInitializerAction,
} from '@store/actions/initializer.actions';
import {
  userLoginFailAction,
  userLoginSuccessAction,
} from '@store/actions/user.actions';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
        tap(() => this.authService.devAutoLogin())
      );
    },
    { dispatch: false }
  );

  releaseAppInitializer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userLoginSuccessAction, userLoginFailAction),
      map(() => releaseAppInitializerAction())
    );
  });
}
