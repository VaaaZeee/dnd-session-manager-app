import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Nullable } from '@models/nullable';

@Component({
  selector: 'dnd-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormInputComponent {
  @Input() type: string = 'text';
  @Input() label: Nullable<string>;
  @Input() placeholder: Nullable<string>;
  @Input() startIcon: Nullable<string>;
  @Input() endIcon: Nullable<string>;
  @Output() endIconClicked = new EventEmitter<void>();

  constructor() {}
}
