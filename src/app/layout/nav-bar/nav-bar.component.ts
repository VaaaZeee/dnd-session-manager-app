import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logoutUserAction } from '@store/actions/user.actions';

@Component({
  selector: 'dnd-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(
    protected readonly router: Router,
    protected readonly store: Store
  ) {}

  protected logout(): void {
    this.store.dispatch(logoutUserAction());
  }
}
