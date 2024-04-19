import { Component, Input } from '@angular/core';
import { TestFirebaseService } from '../core/services/test/testFirebase.service';

@Component({
  selector: 'dnd-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;
  public testData$ = this.testFirebaseService.testDB();

  constructor(private readonly testFirebaseService: TestFirebaseService) {}
}
