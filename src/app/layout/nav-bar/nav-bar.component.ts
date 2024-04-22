import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUserAction } from '@store/actions/user.actions';
import { distinctUntilChanged, map } from 'rxjs';
import { PAGES } from 'src/app/app-route-enums';

@Component({
  selector: 'dnd-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  protected readonly isVisible$ = this.router.events.pipe(
    map(() => this.router.url === `/${PAGES.MAIN}`),
    distinctUntilChanged()
  );

  constructor(
    protected readonly router: Router,
    protected readonly store: Store
  ) {}

  protected logout(): void {
    this.store.dispatch(logoutUserAction());
  }
}
