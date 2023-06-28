/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestFirebaseService } from './testFirebase.service';

describe('Service: TestFirebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestFirebaseService]
    });
  });

  it('should ...', inject([TestFirebaseService], (service: TestFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
