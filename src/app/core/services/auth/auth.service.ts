import { Injectable, isDevMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserData } from '@models/userData';
import { Store } from '@ngrx/store';
import {
  startUserAutoLoginAction,
  userAutoLoginFailAction,
  userAutoLoginSuccessAction,
} from '@store/actions/user.actions';
import { Observable, delay, from, map, of, switchMap, tap } from 'rxjs';
import { PAGES } from 'src/app/app-route-enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public isAuthenticated(): Observable<boolean> {
    return from(this.afAuth.currentUser).pipe(map((user) => !!user));
  }

  public registerUser(
    email: string,
    password: string,
    userName: string
  ): Observable<UserData> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map(({ user }) => {
        if (!user) {
          throw new Error('The account could not be created');
        }
        return user;
      }),
      switchMap((user: UserData) =>
        from(user.updateProfile({ displayName: userName })).pipe(
          map(() => JSON.parse(JSON.stringify(user)))
        )
      )
    );
  }

  public loginWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserData> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(({ user }) => {
        if (!user) {
          throw new Error('User not found');
        }
        return JSON.parse(JSON.stringify(user));
      }),
      tap(() => this.setDevAutoLogin(email, password))
    );
  }

  public logout(): Observable<void> {
    return from(
      this.afAuth
        .signOut()
        .then(() => {
          this.removeUserDataFromLocalStorage();
          this.router.navigateByUrl(`/${PAGES.LOGIN}`);
        })
        .catch((err) => console.log(err))
    );
  }

  private setDevAutoLogin(email: string, password: string): void {
    if (isDevMode()) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    } else {
      this.removeUserDataFromLocalStorage();
    }
  }

  public devAutoLogin(): void {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (isDevMode() && email && password) {
      this.store.dispatch(startUserAutoLoginAction({ email, password }));
    } else {
      this.store.dispatch(userAutoLoginFailAction());
    }
  }

  public autoLogin(): Observable<any> {
    if (isDevMode()) {
      return of(this.devAutoLogin()).pipe(delay(500));
    }
    return from(this.afAuth.currentUser).pipe(
      tap((currentUser) => {
        if (currentUser) {
          this.store.dispatch(
            userAutoLoginSuccessAction({
              user: JSON.parse(JSON.stringify(currentUser)),
            })
          );
        } else {
          this.store.dispatch(userAutoLoginFailAction());
        }
      })
    );
  }

  private removeUserDataFromLocalStorage(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}
