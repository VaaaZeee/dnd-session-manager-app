import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dnd-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AppComponent {}
