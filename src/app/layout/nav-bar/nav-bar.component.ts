import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { logoutUserAction } from '@store/actions/user.actions';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'dnd-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [IonIcon],
})
export class NavBarComponent {
  constructor(
    protected readonly router: Router,
    protected readonly store: Store
  ) {
    addIcons({ logOutOutline });
  }

  protected logout(): void {
    this.store.dispatch(logoutUserAction());
  }
}
