import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  userLoginSuccessAction,
  userRegistrationSuccessAction,
} from '@store/actions/user.actions';
import { tap } from 'rxjs';

@Injectable()
export class RedirectEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) {}

  navigateToHomePage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(userRegistrationSuccessAction, userLoginSuccessAction),
        tap(() => this.router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );
}
