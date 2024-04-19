import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Nullable } from '@models/nullable';
import { UserData } from '@models/userData';
import { isStrictDefined } from '@utils/is-strict-defined';
import { Observable, filter, from, map, switchMap } from 'rxjs';

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
  ): Observable<Nullable<UserData>> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      map(({ user }) => user),
      filter(isStrictDefined),
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
  ): Observable<Nullable<UserData>> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(({ user }) => user)
    );
  }

  public logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }
}
