import { Injectable, isDevMode } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserData } from '@models/userData';
import { Store } from '@ngrx/store';
import {
  startLoginUserAction,
  userLoginFailAction,
} from '@store/actions/user.actions';
import { Observable, from, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private readonly store: Store) {}

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
          map(() => structuredClone(user))
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
        return structuredClone(user);
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
      this.store.dispatch(startLoginUserAction({ email, password }));
    } else {
      this.store.dispatch(userLoginFailAction());
    }
  }

  private removeUserDataFromLocalStorage(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
}
