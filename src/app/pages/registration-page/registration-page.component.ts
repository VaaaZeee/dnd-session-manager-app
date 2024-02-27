import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, scan } from 'rxjs';

@Component({
  selector: 'dnd-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPageComponent {
  private toggleShowPassword$ = new Subject<void>();
  protected showPassword$ = this.toggleShowPassword$
    .asObservable()
    .pipe(scan((state, _) => !state, false));

  constructor() {}

  toggleShowPassword(): void {
    this.toggleShowPassword$.next();
  }
}
