import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs, query } from 'firebase/firestore';

export interface TestData {
  test: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestFirebaseService {
  constructor(private readonly firestore: Firestore) {}

  public async testDB(): Promise<TestData[]> {
    return (await getDocs(query(collection(this.firestore, 'test')))).docs.map(
      (test) => test.data() as TestData
    );
  }
}
