import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, tap } from 'rxjs';

export interface TestData {
  test: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestFirebaseService {
  constructor(private readonly firestore: AngularFirestore) {}

  public testDB(): Observable<TestData[]> {
    return this.firestore
      .collection<TestData>('test')
      .valueChanges()
      .pipe(tap(console.log));
  }
}
