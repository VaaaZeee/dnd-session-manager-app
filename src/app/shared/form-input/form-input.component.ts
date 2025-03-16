import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';
import { Nullable } from '@models/nullable';
import { addIcons } from 'ionicons';
import { eye, eyeOff, lockClosed, mail, person } from 'ionicons/icons';
import { Subject, debounceTime, takeUntil, tap } from 'rxjs';

type IconTypes = 'mail' | 'person' | 'lock-closed' | 'eye' | 'eye-off';

@Component({
  selector: 'dnd-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, IonIcon, IonInput, IonItem, IonList, IonButton],
})
export class FormInputComponent implements OnInit, OnDestroy {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: Nullable<string>;
  @Input() startIcon: Nullable<IconTypes>;
  @Input() endIcon: Nullable<string>;
  @Output() endIconClicked = new EventEmitter<void>();
  @Output() valueChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  private valueChange$ = new Subject<string>();

  constructor() {
    addIcons({ mail, person, lockClosed, eye, eyeOff });
  }

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
