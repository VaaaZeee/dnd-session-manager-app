import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserData } from '@models/userData';
import { Observable, from, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

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
          map(() => user)
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
        return user;
      })
    );
  }

  public logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
