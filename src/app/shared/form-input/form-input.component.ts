import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Nullable } from '@models/nullable';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'dnd-form-input',
    templateUrl: './form-input.component.html',
    styleUrls: ['./form-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FormInputComponent implements OnInit, OnDestroy {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: Nullable<string>;
  @Input() startIcon: Nullable<string>;
  @Input() endIcon: Nullable<string>;
  @Output() endIconClicked = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  private valueChange$ = new Subject<string>();

  public ngOnInit(): void {
    this.valueChange$
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(200),
        tap((value) => this.valueChange.emit(value))
      )
      .subscribe();
  }

  protected inputValueChange(value: string) {
    this.valueChange$.next(value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
