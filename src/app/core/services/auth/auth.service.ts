import { Injectable, isDevMode } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@models/user';
import { Store } from '@ngrx/store';
import {
  startUserAutoLoginAction,
  userAutoLoginFailAction,
  userAutoLoginSuccessAction,
} from '@store/actions/user.actions';
import { delay, Observable, of, tap } from 'rxjs';
import { PAGES } from 'src/app/app-route-enums';
import { UserUtil } from './../../../utils/user.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  public isAuthenticated(): boolean {
    return !!this.auth.currentUser;
  }

  public async registerUser(
    email: string,
    password: string,
    userName: string
  ): Promise<User> {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then(({ user }) => {
      if (!user) {
        throw new Error('The account could not be created');
      }
      return user;
    });
    await updateProfile(user, { displayName: userName });

    return UserUtil.mapFirebaseUser(user);
  }

  public async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    const user = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then(({ user }) => {
      if (!user) {
        throw new Error('User not found');
      }
      this.setDevAutoLogin(email, password);
      return user;
    });

    return UserUtil.mapFirebaseUser(user);
  }

  public logout(): Promise<void> {
    return this.auth
      .signOut()
      .then(() => {
        this.removeUserDataFromLocalStorage();
        this.router.navigateByUrl(`/${PAGES.LOGIN}`);
      })
      .catch((err) => console.log(err));
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

    return of(this.auth.currentUser).pipe(
      tap((currentUser) => {
        if (currentUser) {
          this.store.dispatch(
            userAutoLoginSuccessAction({
              user: UserUtil.mapFirebaseUser(currentUser),
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
