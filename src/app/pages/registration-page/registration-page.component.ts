import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { startRegisterUserAction } from '@store/actions/user.actions';
import { CustomValidators } from '@utils/custom-validators.utils';
import { Subject, scan } from 'rxjs';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'dnd-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    IonButton,
    ReactiveFormsModule,
    FormInputComponent,
    AsyncPipe,
  ],
})
export class RegistrationPageComponent {
  private toggleShowPassword$ = new Subject<void>();
  protected showPassword$ = this.toggleShowPassword$
    .asObservable()
    .pipe(scan((state, _) => !state, false));

  protected registerForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(32),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    },
    { validators: [CustomValidators.passwordConfirming] }
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  protected updateForm(formControlName: string, value: string): void {
    this.registerForm.patchValue({ [formControlName]: value });
  }

  protected toggleShowPassword(): void {
    this.toggleShowPassword$.next();
  }

  protected submitRegistrationForm(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      const userName = this.registerForm.get('userName')?.value;
      this.store.dispatch(
        startRegisterUserAction({ email, password, userName })
      );
    }
  }
}
