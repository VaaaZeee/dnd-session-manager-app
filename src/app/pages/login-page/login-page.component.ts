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
import { startLoginUserAction } from '@store/actions/user.actions';
import { Subject, scan } from 'rxjs';
import { FormInputComponent } from '../../shared/form-input/form-input.component';

@Component({
  selector: 'dnd-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    IonButton,
    ReactiveFormsModule,
    FormInputComponent,
    AsyncPipe,
  ],
})
export class LoginPageComponent {
  private toggleShowPassword$ = new Subject<void>();
  protected showPassword$ = this.toggleShowPassword$
    .asObservable()
    .pipe(scan((state, _) => !state, false));

  protected loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(32)],
    ],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  protected updateForm(formControlName: string, value: string): void {
    this.loginForm.patchValue({ [formControlName]: value });
  }

  protected submitLoginForm(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.store.dispatch(startLoginUserAction({ email, password }));
    }
  }

  protected toggleShowPassword(): void {
    this.toggleShowPassword$.next();
  }
}
