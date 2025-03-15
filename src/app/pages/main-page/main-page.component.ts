import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavBarComponent } from '../../layout/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'dnd-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavBarComponent, RouterOutlet]
})
export class MainPageComponent {}
