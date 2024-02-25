import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, scan, startWith, tap } from 'rxjs';

@Component({
  selector: 'dnd-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private toggleShowPassword$ = new Subject<void>();
  protected showPassword$ = this.toggleShowPassword$
    .asObservable()
    .pipe(scan((state, _) => !state, false));

  constructor() {
    this.toggleShowPassword();
  }

  toggleShowPassword(): void {
    this.toggleShowPassword$.next();
  }
}
