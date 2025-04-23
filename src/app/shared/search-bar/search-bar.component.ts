import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Nullable } from '@models/nullable';
import { FormInputComponent } from '@shared/form-input/form-input.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'dnd-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormInputComponent],
})
export class SearchBarComponent {
  @Output() public searchTermChanged = new EventEmitter<string>();

  protected setValue$ = new Subject<Nullable<string>>();
}
