import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dnd-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MainPageComponent {}
